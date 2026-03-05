from pydantic import BaseModel


class CompleteArtisanProfile(BaseModel):
    date_of_birth: str | None = None
    street_address: str | None = None
    city: str | None = None
    state: str | None = None
    profession: str | None = None


class ArtisanProfileRequest(CompleteArtisanProfile):
    pass
