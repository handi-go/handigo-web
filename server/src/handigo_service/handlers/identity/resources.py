from handigo_service.resources import (
    AsyncUnitOfWorkProviderResource,
    PasswordHasherResource,
    Resource,
    TokenServiceResource,
)


# Identity section resources used by the composition root.
def get_resources() -> list[Resource]:
    return [
        AsyncUnitOfWorkProviderResource(),
        PasswordHasherResource(),
        TokenServiceResource(),
    ]
