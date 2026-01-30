import logging
from dataclasses import dataclass
from typing import List

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
            # 1️⃣ Fetch user by email
            user = await uow.user_repo.get_by_email(dto.email)

            # =========================
            # EXISTING USER
            # =========================
            if user:
                added_any_role = False

                # CUSTOMER
                if dto.is_customer:
                    exists = await uow.customer_repo.exists_for_user(user.id)
                    if exists:
                        raise ValueError("User is already registered as CUSTOMER")

                    uow.customer_repo.create(
                        Customer(
                            user_id=user.id,
                            first_name=dto.first_name,
                            last_name=dto.last_name,
                            phone=dto.phone,
                        )
                    )
                    user.roles.append(Role.CUSTOMER)
                    added_any_role = True

                # ARTISAN
                if dto.is_artisan:
                    exists = await uow.artisan_repo.exists_for_user(user.id)
                    if exists:
                        raise ValueError("User is already registered as ARTISAN")

                    uow.artisan_repo.create(
                        Artisan(
                            user_id=user.id,
                            first_name=dto.first_name,
                            last_name=dto.last_name,
                            phone=dto.phone,
                        )
                    )
                    user.roles.append(Role.ARTISAN)
                    added_any_role = True

                if not added_any_role:
                    raise ValueError("No new role selected for registration")

                await uow.commit()

                return UserRegistrationResponse(
                    uuid=user.uuid,
                    email=user.email,
                    roles=user.roles,
                )

            # =========================
            # NEW USER
            # =========================
            user = User(
                email=dto.email,
                hashed_password=self._hash_password(dto.password),
                roles=[],
            )
            uow.user_repo.create(user)
            await uow.commit()  # generates id + uuid

            # CUSTOMER
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

            # ARTISAN
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

            if not user.roles:
                raise ValueError("At least one role must be selected")

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
