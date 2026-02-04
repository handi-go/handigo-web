import logging
from dataclasses import dataclass

from passlib.context import CryptContext

from handigo_service.application.model import User, Customer, Artisan, Role
from handigo_service.infrastructure.repository.unit_of_work import AsyncUnitOfWorkProvider
from handigo_service.interface.api.v1.dto.user import (
    UserRegistrationRequest,
    UserRegistrationResponse,
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
        self, dto: UserRegistrationRequest
    ) -> UserRegistrationResponse:
        async with self.uow_provider.uow() as uow:
            user = await uow.user_repo.get_by_email(dto.email)

            requested_roles: list[Role] = []
            if dto.is_customer:
                requested_roles.append(Role.CUSTOMER)
            if dto.is_artisan:
                requested_roles.append(Role.ARTISAN)

            if not requested_roles:
                raise ValueError("At least one role must be selected")

            if user:
                existing_roles = set(user.roles)
                requested_roles_set = set(requested_roles)

                # User already has all requested roles
                if requested_roles_set.issubset(existing_roles):
                    if existing_roles == {Role.CUSTOMER, Role.ARTISAN}:
                        raise ValueError(
                            "User is already registered as CUSTOMER and ARTISAN"
                        )
                    role = next(iter(requested_roles_set))
                    raise ValueError(f"User is already registered as {role}")

                # Add only missing roles
                new_roles = requested_roles_set - existing_roles

                if Role.CUSTOMER in new_roles:
                    uow.customer_repo.create(Customer(user_id=user.id))
                    user.roles.append(Role.CUSTOMER)

                if Role.ARTISAN in new_roles:
                    uow.artisan_repo.create(Artisan(user_id=user.id))
                    user.roles.append(Role.ARTISAN)

                await uow.commit()

                return UserRegistrationResponse(
                    uuid=user.uuid,
                    email=user.email,
                    roles=user.roles,
                )

            user = User(
                email=dto.email,
                hashed_password=self._hash_password(dto.password),
                roles=[],
            )
            uow.user_repo.create(user)
            await uow.commit()

            if Role.CUSTOMER in requested_roles:
                uow.customer_repo.create(Customer(user_id=user.id))
                user.roles.append(Role.CUSTOMER)

            if Role.ARTISAN in requested_roles:
                uow.artisan_repo.create(Artisan(user_id=user.id))
                user.roles.append(Role.ARTISAN)

            await uow.commit()

            return UserRegistrationResponse(
                uuid=user.uuid,
                email=user.email,
                roles=user.roles,
            )

    async def authenticate_user(self, email: str, password: str) -> User | None:
        async with self.uow_provider.uow() as uow:
            user = await uow.user_repo.get_by_email(email)
            if not user:
                return None
            if not self._verify_password(password, user.hashed_password):
                return None
            return user

    @staticmethod
    def _verify_password(plain_password: str, hashed_password: str) -> bool:
        return pwd_context.verify(plain_password, hashed_password)

    @staticmethod
    def _hash_password(password: str) -> str:
        return pwd_context.hash(password)
