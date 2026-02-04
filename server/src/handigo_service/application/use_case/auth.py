import logging
from dataclasses import dataclass
from typing import Optional

from passlib.context import CryptContext

from handigo_service.application.model import User, Customer, Artisan, Role
from handigo_service.infrastructure.repository.unit_of_work import AsyncUnitOfWorkProvider
from handigo_service.interface.api.v1.dto.user import (
    UserRegistrationRequest,
    UserRegistrationResponse,
     RegistrationError,
    UserAlreadyExistsError,
    NoRoleSelectedError
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
        try:
            async with self.uow_provider.uow() as uow:
                user = await uow.user_repo.get_by_email(dto.email)

                requested_roles: list[Role] = []
                if dto.is_customer:
                    requested_roles.append(Role.CUSTOMER)
                if dto.is_artisan:
                    requested_roles.append(Role.ARTISAN)

                if not requested_roles:
                    raise NoRoleSelectedError("At least one role must be selected")

                if user:
                    # Check if customer/artisan records already exist in database
                    customer_exists = await uow.customer_repo.exists_for_user(user.id)
                    artisan_exists = await uow.artisan_repo.exists_for_user(user.id)
                    

                    existing_roles_from_user = set(user.roles)
                    existing_roles_from_db = set()
                    
                    if customer_exists:
                        existing_roles_from_db.add(Role.CUSTOMER)
                    if artisan_exists:
                        existing_roles_from_db.add(Role.ARTISAN)
                    
                    # Combine both sources of truth
                    all_existing_roles = existing_roles_from_user.union(existing_roles_from_db)
                    
                    requested_roles_set = set(requested_roles)

                    # User already has all requested roles (checking BOTH sources)
                    if requested_roles_set.issubset(all_existing_roles):
                        if all_existing_roles == {Role.CUSTOMER, Role.ARTISAN}:
                            raise UserAlreadyExistsError(
                                "User is already registered as CUSTOMER and ARTISAN"
                            )
                        role = next(iter(requested_roles_set))
                        raise UserAlreadyExistsError(f"User is already registered as {role}")

                    # Add only missing roles
                    new_roles = requested_roles_set - all_existing_roles

                    # Create only what doesn't exist
                    if Role.CUSTOMER in new_roles:
                        uow.customer_repo.create(Customer(user_id=user.id))
                        
                    if Role.ARTISAN in new_roles:
                        uow.artisan_repo.create(Artisan(user_id=user.id))
                    
                    # Update user's roles list to include ALL roles they have
                    updated_roles = list(all_existing_roles.union(new_roles))
                    user.roles = updated_roles

                    await uow.commit()

                    return UserRegistrationResponse(
                        uuid=user.uuid,
                        email=user.email,
                        roles=user.roles,
                    )

                user = User(
                    email=dto.email,
                    first_name=dto.first_name,
                    last_name=dto.last_name,
                    phone=dto.phone,
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
                
        except (NoRoleSelectedError, UserAlreadyExistsError) as e:
            raise
        except Exception as e:
            _LOG.error(f"Unexpected error during user registration: {str(e)}", exc_info=True)
            raise RegistrationError(f"Registration failed: {str(e)}")
        
    async def authenticate_user(self, email: str, password: str) -> Optional[User]:
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