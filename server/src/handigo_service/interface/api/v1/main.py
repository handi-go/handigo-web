from contextlib import asynccontextmanager
from fastapi import FastAPI

from .routes.router import router as v1_router
from handigo_service.dependancy_container import Application
from handigo_service.resources import AsyncUnitOfWorkProviderResource


@asynccontextmanager
async def lifespan(app: FastAPI):
    application = Application()
    application.inject_resources(
        [AsyncUnitOfWorkProviderResource()]
    )
    yield


app = FastAPI(
    title="Handigo Service",
    lifespan=lifespan,
)

app.include_router(v1_router)
