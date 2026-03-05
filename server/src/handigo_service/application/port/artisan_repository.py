from typing import Protocol
from uuid import UUID

from handigo_service.application.dto.dashboard import (
    ArtisanProfileOverview,
    CustomerJobRequest,
    DashboardStats,
    PastBooking,
)
from handigo_service.application.model.user import Artisan


class ArtisanRepositoryPort(Protocol):
    async def get_by_id(self, user_id: int) -> Artisan | None:
        ...

    async def get_dashboard_stats(self, artisan_uuid: UUID) -> DashboardStats:
        ...

    async def get_job_requests(self, artisan_uuid: UUID) -> list[CustomerJobRequest]:
        ...

    async def get_profile_overview(self, user_id: int) -> ArtisanProfileOverview:
        ...

    async def get_past_bookings(self, artisan_uuid: UUID) -> list[PastBooking]:
        ...
