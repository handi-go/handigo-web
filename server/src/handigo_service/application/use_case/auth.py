from dataclasses import dataclass

from handigo_service.application.dto.auth import (
    RegisterUserRequest,
    RegisterUserResponse,
    VerifyOtpResponse,
)
from handigo_service.application.exceptions.auth import (
    NoRoleSelectedError,
    UserAlreadyExistsError,
)
from handigo_service.application.model import Role, User
from handigo_service.application.port import (
    AsyncUnitOfWorkPort,
    AsyncUnitOfWorkProviderPort,
    EmailServicePort,
    OtpStorePort,
    PasswordHasherPort,
)
from handigo_service.config import OtpConfig
from handigo_service.pkg.utils import generate_otp_code


@dataclass
class AuthUseCase:
    uow_provider: AsyncUnitOfWorkProviderPort
    password_hasher: PasswordHasherPort
    otp_store: OtpStorePort
    email_service: EmailServicePort

    def __post_init__(self):
        if not self.uow_provider:
            raise ValueError("uow_provider is not injected")
        if not self.password_hasher:
            raise ValueError("password_hasher is not injected")
        if not self.otp_store:
            raise ValueError("otp_store is not injected")
        if not self.email_service:
            raise ValueError("email_service is not injected")

    async def register_user(self, command: RegisterUserRequest) -> RegisterUserResponse:
        async with self.uow_provider.uow() as uow:
            requested_roles = self._extract_requested_roles(command)
            user = await uow.user_repo.get_by_email(command.email)

            if user and not user.is_active:
                await uow.user_repo.delete_unverified_by_email(command.email)
                user = None

            if user:
                response = await self._handle_existing_user(uow, user, requested_roles)
            else:
                response = await self._handle_new_user(uow, command, requested_roles)

            await uow.commit()

            otp_code = generate_otp_code()
            await self.otp_store.save_otp(
                email=response.email,
                otp_code=otp_code,
                ttl_seconds=OtpConfig.OTP_TTL_SECONDS,
            )
            await self.email_service.send_verification_email(
                email=response.email,
                first_name=command.first_name or "there",
                otp_code=otp_code,
            )
            return response

    async def verify_otp(self, email: str, otp_code: str) -> VerifyOtpResponse:
        saved_otp = await self.otp_store.get_otp(email)
        if saved_otp is None:
            return VerifyOtpResponse(
                verified=False,
                message="OTP expired or not found",
            )

        if saved_otp != otp_code:
            return VerifyOtpResponse(
                verified=False,
                message="Invalid OTP code",
            )

        async with self.uow_provider.uow() as uow:
            user = await uow.user_repo.activate_by_email(email)
            if user is None:
                return VerifyOtpResponse(
                    verified=False,
                    message="User not found",
                )
            await uow.commit()

        await self.otp_store.delete_otp(email)
        return VerifyOtpResponse(
            verified=True,
            message="OTP verified successfully",
        )

    async def _handle_existing_user(
        self,
        uow: AsyncUnitOfWorkPort,
        user: User,
        requested_roles: set[Role],
    ) -> RegisterUserResponse:
        existing_roles = set(user.roles)
        duplicate_roles = requested_roles & existing_roles
        if duplicate_roles:
            role = next(iter(duplicate_roles))
            raise UserAlreadyExistsError(f"User is already registered as {role}")

        new_roles = requested_roles - existing_roles
        await uow.user_repo.add_roles(user, new_roles)

        return RegisterUserResponse(
            uuid=user.uuid,
            email=user.email,
            roles=user.roles,
        )

    async def _handle_new_user(
        self,
        uow: AsyncUnitOfWorkPort,
        command: RegisterUserRequest,
        requested_roles: set[Role],
    ) -> RegisterUserResponse:
        user = User(
            email=command.email,
            first_name=command.first_name,
            last_name=command.last_name,
            phone=command.phone,
            hashed_password=self._hash_password(command.password),
            is_active=False,
        )

        await uow.user_repo.create_with_roles(user, requested_roles)

        return RegisterUserResponse(
            uuid=user.uuid,
            email=user.email,
            roles=user.roles,
        )

    async def get_user_by_email(self, email: str) -> User | None:
        async with self.uow_provider.uow() as uow:
            return await uow.user_repo.get_by_email(email)

    async def authenticate_user(self, email: str, password: str) -> User | None:
        async with self.uow_provider.uow() as uow:
            user = await uow.user_repo.get_by_email(email)

            if not user:
                return None

            if not self._verify_password(password, user.hashed_password):
                return None

            return user

    def _extract_requested_roles(self, command: RegisterUserRequest) -> set[Role]:
        roles: set[Role] = set()

        if command.is_customer:
            roles.add(Role.CUSTOMER)

        if command.is_artisan:
            roles.add(Role.ARTISAN)

        if not roles:
            raise NoRoleSelectedError("At least one role must be selected")

        return roles

    def _verify_password(self, plain_password: str, hashed_password: str) -> bool:
        return self.password_hasher.verify(plain_password, hashed_password)

    def _hash_password(self, password: str) -> str:
        return self.password_hasher.hash(password)
