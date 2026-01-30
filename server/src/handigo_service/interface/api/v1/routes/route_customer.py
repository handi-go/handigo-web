from fastapi import APIRouter, Depends

from handigo_service.interface.api.auth import get_current_user

# public customer routes
open_router = APIRouter(prefix="/v1/customer",tags=["Customers"])

# protected customer routes
router = APIRouter(
    prefix="/v1/customer",
    dependencies=[Depends(get_current_user)],
    tags=["Customers"]
)

