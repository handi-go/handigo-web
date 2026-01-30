import logging
from dataclasses import dataclass
from passlib.context import CryptContext
from typing import List

from handigo_service.application.model import User, Customer, Artisan, Role
from handigo_service.infrastructure.repository.unit_of_work import AsyncUnitOfWorkProvider
from handigo_service.interface.api.v1.dto.user import UserRegistrationRequest, UserRegistrationResponse

_LOG = logging.getLogger(__name__)
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


@dataclass
class AuthUseCase:
    uow_provider: AsyncUnitOfWorkProvider

    def __post_init__(self):
        if not self.uow_provider:
            raise ValueError("uow_provider is not injected")

    async def register_user(self, dto: UserRegistrationRequest) -> UserRegistrationResponse:
        async with self.uow_provider.uow() as uow:
            roles_to_add: List[Role] = []
            if dto.is_customer:
                roles_to_add.append(Role.CUSTOMER)
            if dto.is_artisan:
                roles_to_add.append(Role.ARTISAN)

            # Check if user already exists with all requested roles
            existing_user = await uow.user_repo.check_user_exists(dto.email, roles=[r.value for r in roles_to_add])
            if existing_user:
                raise ValueError("User with this email and roles already exists")

            # Check if user exists with some roles missing
            user = await uow.user_repo.get_by_email(dto.email)
            if user:
                # Add missing roles and related tables
                if dto.is_customer and Role.CUSTOMER not in user.roles:
                    uow.customer_repo.create(
                        Customer(
                            user_id=user.id,
                            first_name=dto.first_name,
                            last_name=dto.last_name,
                            phone=dto.phone,
                        )
                    )
                    user.roles.append(Role.CUSTOMER)

                if dto.is_artisan and Role.ARTISAN not in user.roles:
                    uow.artisan_repo.create(
                        Artisan(
                            user_id=user.id,
                            first_name=dto.first_name,
                            last_name=dto.last_name,
                            phone=dto.phone,
                        )
                    )
                    user.roles.append(Role.ARTISAN)

                await uow.commit()
                return UserRegistrationResponse(
                    uuid=user.uuid,
                    email=user.email,
                    roles=user.roles
                )

            # User doesn't exist → create new
            user = User(
                email=dto.email,
                hashed_password=self._hash_password(dto.password),
                roles=[],
            )
            uow.user_repo.create(user)
            await uow.commit()  # generate ID and UUID

            # Create role-specific tables
            if dto.is_customer:
                uow.customer_repo.create(
                    Customer(
                        user_id=user.id,
                        first_name=dto.first_name,
                        last_name=dto.last_name,
                        phone=dto.phone,
                    )
                )
                user.roles.append(Role.CUSTOMER)

            if dto.is_artisan:
                uow.artisan_repo.create(
                    Artisan(
                        user_id=user.id,
                        first_name=dto.first_name,
                        last_name=dto.last_name,
                        phone=dto.phone,
                    )
                )
                user.roles.append(Role.ARTISAN)

            await uow.commit()

            return UserRegistrationResponse(
                uuid=user.uuid,
                email=user.email,
                roles=user.roles
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
