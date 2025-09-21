import click
import uvicorn

from handigo_service.config import setup_logger
from handigo_service.dependancy_container import Application


@click.group()
@click.pass_context
def main(context):
    """Welcome to Handigo Service CLI!"""
    setup_logger()

    app = Application()
    context.obj = app


@main.command()
@click.option("--host", default="0.0.0.0")  # nosec B104
@click.option("--port", default=8000, type=int)
def run_server(host: str, port: int):
    """Run webhook server"""
    uvicorn.run(
        "handigo_service.interface.api.v1.main:fast_api_app",
        host=host,
        port=port,
        log_level="debug",
    )
