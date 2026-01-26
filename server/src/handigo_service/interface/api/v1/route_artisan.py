from fastapi import APIRouter, Depends
from handigo_service.interface.api.auth import get_current_user

router = APIRouter(
    prefix="/v1/artisan",
    tags=["Artisans"],
    dependencies=[Depends(get_current_user)],
)

@router.get("/")
async def list_artisans():
    return []
