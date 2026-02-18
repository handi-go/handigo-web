from contextlib import asynccontextmanager

from fastapi import FastAPI

from handigo_service.dependancy_container import Application
from handigo_service.handlers.identity import get_resources as get_identity_resources

from .routes.router import router as v1_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    application = Application()
    application.inject_resources(get_identity_resources())
    yield


app = FastAPI(
    title="Handigo Service",
    lifespan=lifespan,
)

app.include_router(v1_router)
