from fastapi import APIRouter, Depends, HTTPException

from handigo_service.application.model import User
from handigo_service.dependancy_container import Application
from handigo_service.interface.api.auth import get_current_user

router = APIRouter(
    prefix="/v1/artisan",
    tags=["Artisans"],
    dependencies=[Depends(get_current_user)],
)


@router.get("/me")
async def get_artisan_profile(
    current_user: User = Depends(get_current_user),
    application: Application = Depends(Application),
):
    try:
        return await application.identity.user_profile.require_artisan(current_user)
    except PermissionError as exc:
        raise HTTPException(status_code=403, detail=str(exc))
