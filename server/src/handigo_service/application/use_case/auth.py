from dataclasses import dataclass

from handigo_service.application.dto.auth import RegisterUserRequest, RegisterUserResponse
from handigo_service.application.exceptions.auth import (
    NoRoleSelectedError,
    UserAlreadyExistsError,
)
from handigo_service.application.model import Role, User
from handigo_service.application.port import (
    AsyncUnitOfWorkPort,
    AsyncUnitOfWorkProviderPort,
    PasswordHasherPort,
)


@dataclass
class AuthUseCase:
    uow_provider: AsyncUnitOfWorkProviderPort
    password_hasher: PasswordHasherPort

    def __post_init__(self):
        if not self.uow_provider:
            raise ValueError("uow_provider is not injected")
        if not self.password_hasher:
            raise ValueError("password_hasher is not injected")

    async def register_user(self, command: RegisterUserRequest) -> RegisterUserResponse:
        async with self.uow_provider.uow() as uow:
            requested_roles = self._extract_requested_roles(command)
            user = await uow.user_repo.get_by_email(command.email)

            if user:
                response = await self._handle_existing_user(uow, user, requested_roles)
            else:
                response = await self._handle_new_user(uow, command, requested_roles)

            await uow.commit()
            return response

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
