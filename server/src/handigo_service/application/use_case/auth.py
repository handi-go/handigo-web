import logging
from dataclasses import dataclass
from typing import Optional, Set

from passlib.context import CryptContext

from handigo_service.application.model import (
    User,
    Role,
)
from handigo_service.infrastructure.repository.unit_of_work import (
    AsyncUnitOfWorkProvider,
)
from handigo_service.interface.api.v1.dto.user import (
    UserRegistrationRequest,
    UserRegistrationResponse,
    NoRoleSelectedError,
    UserAlreadyExistsError,
)

_LOG = logging.getLogger(__name__)
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


@dataclass
class AuthUseCase:
    uow_provider: AsyncUnitOfWorkProvider

    def __post_init__(self):
        if not self.uow_provider:
            raise ValueError("uow_provider is not injected")

    async def register_user(
        self,
        dto: UserRegistrationRequest,
    ) -> UserRegistrationResponse:

        async with self.uow_provider.uow() as uow:

            requested_roles = self._extract_requested_roles(dto)

            user = await uow.user_repo.get_by_email(dto.email)

            if user:
                response = await self._handle_existing_user(
                    uow,
                    user,
                    requested_roles,
                )
            else:
                response = await self._handle_new_user(
                    uow,
                    dto,
                    requested_roles,
                )

            await uow.commit()
            return response

    async def _handle_existing_user(
        self,
        uow,
        user: User,
        requested_roles: Set[Role],
    ) -> UserRegistrationResponse:

        existing_roles = set(user.roles)

        duplicate_roles = requested_roles & existing_roles
        if duplicate_roles:
            role = next(iter(duplicate_roles))
            raise UserAlreadyExistsError(
                f"User is already registered as {role}"
            )

        new_roles = requested_roles - existing_roles

        await uow.user_repo.add_roles(user, new_roles)

        return UserRegistrationResponse(
            uuid=user.uuid,
            email=user.email,
            roles=user.roles,
        )

    async def _handle_new_user(
        self,
        uow,
        dto: UserRegistrationRequest,
        requested_roles: Set[Role],
    ) -> UserRegistrationResponse:

        user = User(
            email=dto.email,
            first_name=dto.first_name,
            last_name=dto.last_name,
            phone=dto.phone,
            hashed_password=self._hash_password(dto.password),
        )

        await uow.user_repo.create_with_roles(
            user,
            requested_roles,
        )

        return UserRegistrationResponse(
            uuid=user.uuid,
            email=user.email,
            roles=user.roles,
        )


    async def authenticate_user(
        self,
        email: str,
        password: str,
    ) -> Optional[User]:

        async with self.uow_provider.uow() as uow:
            user = await uow.user_repo.get_by_email(email)

            if not user:
                return None

            if not self._verify_password(password, user.hashed_password):
                return None

            return user

    def _extract_requested_roles(
        self,
        dto: UserRegistrationRequest,
    ) -> Set[Role]:

        roles = set()

        if dto.is_customer:
            roles.add(Role.CUSTOMER)

        if dto.is_artisan:
            roles.add(Role.ARTISAN)

        if not roles:
            raise NoRoleSelectedError(
                "At least one role must be selected"
            )

        return roles

    @staticmethod
    def _verify_password(
        plain_password: str,
        hashed_password: str,
    ) -> bool:
        return pwd_context.verify(plain_password, hashed_password)

    @staticmethod
    def _hash_password(password: str) -> str:
        return pwd_context.hash(password)
