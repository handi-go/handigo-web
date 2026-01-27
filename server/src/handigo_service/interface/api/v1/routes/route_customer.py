from fastapi import APIRouter, Depends

from handigo_service.application.use_case.auth import (
    CustomerCreateDTO,
    CustomerProfileResponse,
)
from handigo_service.dependancy_container import Application
from handigo_service.interface.api.auth import get_current_user
from handigo_service.interface.api.v1.dto.user import (
    CustomerRegistrationRequest,
)

# public customer routes
open_router = APIRouter(prefix="/v1/customer",tags=["Customers"])

# protected customer routes
router = APIRouter(
    prefix="/v1/customer",
    dependencies=[Depends(get_current_user)],
    tags=["Customers"]
)


@open_router.post("/register", response_model=CustomerProfileResponse)
async def register_customer(
    registration_data: CustomerRegistrationRequest,
    application: Application = Depends(Application),
):
    customer_dto = CustomerCreateDTO(**registration_data.model_dump())
    return await application.auth.register_customer(customer_dto)


@router.get("/me", response_model=CustomerProfileResponse)
async def get_my_profile(
    current_user=Depends(get_current_user),
):
    return current_user
