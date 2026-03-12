from fastapi import APIRouter
from .route_customer import (
    router as customer_router,
    open_router as customer_open_router,
)
from .route_artisan_profile import router as artisan_profile_router
from .route_auth import router as auth_router  

router = APIRouter()

router.include_router(auth_router)   
router.include_router(customer_open_router)
router.include_router(customer_router)
router.include_router(artisan_profile_router)
