from fastapi import APIRouter, Depends, HTTPException

from handigo_service.application.dto.dashboard import ArtisanDashboard
from handigo_service.application.dto.profile import ArtisanProfileRequest
from handigo_service.application.model import User
from handigo_service.dependancy_container import Application
from handigo_service.interface.api.auth import get_current_user

router = APIRouter(
    prefix="/v1/artisan/profile",
    tags=["Artisan Profile"],
    dependencies=[Depends(get_current_user)],
)


@router.get(
    "/me",
    summary="Get current artisan profile identity",
    description=(
        "Returns full artisan user-account profile details (excluding internal user id). "
        "Requires that a matching record exists in artisan table."
    ),
    responses={
        200: {"description": "Artisan profile fetched."},
        403: {"description": "User does not have artisan role."},
        404: {"description": "User/artisan profile not found."},
    },
)
async def get_artisan_profile(
    current_user: User = Depends(get_current_user),
    application: Application = Depends(Application),
):
    try:
        return await application.identity.user_profile.require_artisan(current_user)
    except PermissionError as exc:
        raise HTTPException(status_code=403, detail=str(exc))
    except ValueError as exc:
        if str(exc) in {"User not found", "Artisan profile not found"}:
            raise HTTPException(status_code=404, detail=str(exc))
        raise HTTPException(status_code=400, detail=str(exc))


@router.get(
    "/dashboard",
    response_model=ArtisanDashboard,
    summary="Get artisan dashboard",
    description=(
        "Returns dashboard stats, availability, job requests, profile overview, "
        "and past bookings for authenticated artisan."
    ),
    responses={
        200: {"description": "Dashboard fetched successfully."},
        403: {"description": "User does not have artisan role."},
        404: {"description": "User/artisan profile not found."},
    },
)
async def get_artisan_dashboard(
    current_user: User = Depends(get_current_user),
    application: Application = Depends(Application),
):
    try:
        return await application.identity.user_profile.get_artisan_dashboard(
            current_user
        )
    except PermissionError as exc:
        raise HTTPException(status_code=403, detail=str(exc))
    except ValueError as exc:
        if str(exc) in {"User not found", "Artisan profile not found"}:
            raise HTTPException(status_code=404, detail=str(exc))
        raise HTTPException(status_code=400, detail=str(exc))


@router.patch(
    "/complete",
    summary="Complete artisan profile",
    description=(
        "Updates artisan profile details after account verification. "
        "Requires authenticated user token."
    ),
    responses={
        200: {"description": "Profile updated successfully."},
        400: {"description": "Validation/update error."},
        403: {"description": "User does not have artisan role."},
        404: {"description": "User not found."},
    },
)
async def complete_artisan_profile(
    payload: ArtisanProfileRequest,
    current_user: User = Depends(get_current_user),
    application: Application = Depends(Application),
):
    try:
        return await application.identity.user_profile.complete_artisan_profile(
            user=current_user,
            payload=payload,
        )
    except PermissionError as exc:
        raise HTTPException(status_code=403, detail=str(exc))
    except ValueError as exc:
        if str(exc) == "User not found":
            raise HTTPException(status_code=404, detail=str(exc))
        raise HTTPException(status_code=400, detail=str(exc))
