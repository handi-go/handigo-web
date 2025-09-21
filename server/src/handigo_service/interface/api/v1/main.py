from contextlib import asynccontextmanager
from datetime import timedelta
from typing import Annotated

from fastapi import APIRouter, Depends, FastAPI, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from starlette import status

from handigo_service.application.use_case.auth import (
    CustomerCreateDTO,
    CustomerProfileResponse,
)
from handigo_service.config import ServerAPIConfig
from handigo_service.dependancy_container import Application
from handigo_service.interface.api.auth import (
    create_access_token,
    get_current_user,
)
from handigo_service.interface.api.v1.dto import (
    CustomerRegistrationRequest,
    Token,
)
from handigo_service.resources import AsyncUnitOfWorkProviderResource


@asynccontextmanager
async def lifespan(app: FastAPI):
    _app = Application()
    resources = [
        AsyncUnitOfWorkProviderResource(),
    ]
    _app.inject_resources(resources)

    yield


router = APIRouter(prefix="/v1", dependencies=[Depends(get_current_user)])
open_router = APIRouter(prefix="/v1")


@open_router.post("/token", response_model=Token)
async def login_for_access_token(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    application: Application = Depends(Application),
):
    user = await application.auth.authenticate_user(
        email=form_data.username, password=form_data.password
    )
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ServerAPIConfig.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(data={"sub": user.email}, expires_delta=access_token_expires)
    return {"access_token": access_token, "token_type": "bearer"}


@open_router.post("/register", response_model=CustomerProfileResponse)
async def register_customer(
    registration_data: CustomerRegistrationRequest,
    application: Application = Depends(Application),
):
    try:
        customer_dto = CustomerCreateDTO(**registration_data.model_dump())
        return await application.auth.register_customer(customer_dto)
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        )


@open_router.get("/healthcheck")
async def healthcheck():
    return {"msg": "OK"}


# note: this should come after the route definitions
fast_api_app = FastAPI(
    title="Handigo Service",
    lifespan=lifespan,
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json",
)
fast_api_app.include_router(router)
fast_api_app.include_router(open_router)
