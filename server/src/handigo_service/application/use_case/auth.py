import logging
from dataclasses import dataclass

from passlib.context import CryptContext

from handigo_service.application.model import Customer, User
from handigo_service.infrastructure.repository.unit_of_work import AsyncUnitOfWorkProvider

_LOG = logging.getLogger()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


@dataclass
class CustomerCreateDTO:
    email: str
    password: str
    first_name: str | None = None
    last_name: str | None = None
    phone: str | None = None


@dataclass
class CustomerProfileResponse:
    uuid: str
    email: str
    first_name: str | None = None
    last_name: str | None = None
    phone: str | None = None

    @classmethod
    def from_instance(cls, customer: Customer) -> "CustomerProfileResponse":
        return cls(
            uuid=str(customer.uuid),
            email=customer.user.email,
            first_name=customer.first_name,
            last_name=customer.last_name,
            phone=customer.phone,
        )


@dataclass
class AuthUseCase:
    uow_provider: AsyncUnitOfWorkProvider

    def __post_init__(self):
        if not self.uow_provider:
            raise ValueError("uow_provider is not injected")

    async def register_customer(
        self, customer_create_dto: CustomerCreateDTO
    ) -> CustomerProfileResponse:
        async with self.uow_provider.uow() as uow:
            user_repo = uow.user_repo
            customer_repo = uow.customer_repo

            existing_user = await user_repo.get_by_email(customer_create_dto.email)
            if existing_user:
                raise ValueError("User with this email already exists")

            hashed_password = self.__get_password_hash(customer_create_dto.password)
            user = User(
                email=customer_create_dto.email,
                hashed_password=hashed_password,
                roles=["CUSTOMER"],
            )
            user = user_repo.create(user)
            await uow.commit()

            customer = Customer(
                user_id=user.id,
                first_name=customer_create_dto.first_name,
                last_name=customer_create_dto.last_name,
                phone=customer_create_dto.phone,
            )
            customer = customer_repo.create(customer)
            await uow.commit()

            return CustomerProfileResponse.from_instance(customer)

    async def authenticate_user(self, email: str, password: str) -> User | None:
        async with self.uow_provider.uow() as uow:
            user_repo = uow.user_repo
            user = await user_repo.get_by_email(email)
            if not user:
                return None
            if not self.__verify_password(password, user.hashed_password):
                return None
            return user

    @staticmethod
    def __verify_password(plain_password, hashed_password):
        return pwd_context.verify(plain_password, hashed_password)

    @staticmethod
    def __get_password_hash(password):
        return pwd_context.hash(password)
