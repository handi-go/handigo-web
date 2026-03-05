import pytest

from handigo_service.application.dto.dashboard import (
    ArtisanProfileOverview,
    CustomerJobRequest,
    DashboardStats,
    PastBooking,
)
from handigo_service.application.model import Role, User
from handigo_service.application.model.job import JobStatus
from handigo_service.application.use_case.user_profile import UserProfileUseCase


class FakeArtisan:
    def __init__(self, uuid):
        self.uuid = uuid


class FakeArtisanRepo:
    def __init__(self, artisan: FakeArtisan | None = None):
        self._artisan = artisan
        self.dashboard = DashboardStats(
            active_jobs=2,
            total_jobs=5,
            total_earnings=120000,
            rating=4.5,
            review_count=10,
        )

    async def get_by_id(self, user_id: int):
        return self._artisan

    async def get_dashboard_stats(self, artisan_uuid):
        return self.dashboard

    async def get_job_requests(self, artisan_uuid):
        return [
            CustomerJobRequest(
                booking_id=11,
                customer_name="Jane Doe",
                location="Ikeja, Lagos",
                is_verified=True,
            )
        ]

    async def get_profile_overview(self, user_id: int):
        return ArtisanProfileOverview(
            artisan_id=2,
            full_name="Artisan Person",
            profession="Plumber",
            location="Ikeja, Lagos",
            email="artisan@example.com",
        )

    async def get_past_bookings(self, artisan_uuid):
        return [
            PastBooking(
                booking_id=22,
                customer_name="John Doe",
                location="Yaba, Lagos",
                status=JobStatus.ACCEPTED,
            )
        ]


class FakeUserRepo:
    async def get_by_id(self, user_id: int):
        return User(
            id=user_id,
            email="artisan@example.com",
            hashed_password="hashed",
            roles=[Role.ARTISAN],
            is_active=True,
        )


class FakeUoW:
    def __init__(self, artisan_repo: FakeArtisanRepo):
        self.artisan_repo = artisan_repo
        self.user_repo = FakeUserRepo()

    async def __aenter__(self):
        return self

    async def __aexit__(self, exc_type, exc, tb):
        return None

    async def commit(self):
        return None

    async def rollback(self):
        return None


class FakeUoWProvider:
    def __init__(self, artisan_repo: FakeArtisanRepo):
        self.artisan_repo = artisan_repo

    def uow(self):
        return FakeUoW(self.artisan_repo)


@pytest.mark.asyncio
async def test_get_artisan_dashboard_stats_returns_repo_metrics():
    user = User(
        id=1,
        email="artisan@example.com",
        hashed_password="hashed",
        roles=[Role.ARTISAN],
    )
    artisan_repo = FakeArtisanRepo(artisan=FakeArtisan(user.uuid))
    use_case = UserProfileUseCase(uow_provider=FakeUoWProvider(artisan_repo))

    result = await use_case.get_artisan_dashboard_stats(user)

    assert result.active_jobs == 2
    assert result.total_jobs == 5
    assert result.total_earnings == 120000
    assert result.rating == 4.5
    assert result.review_count == 10


@pytest.mark.asyncio
async def test_get_artisan_dashboard_stats_requires_artisan_role():
    user = User(
        id=1,
        email="customer@example.com",
        hashed_password="hashed",
        roles=[Role.CUSTOMER],
    )
    artisan_repo = FakeArtisanRepo(artisan=FakeArtisan(user.uuid))
    use_case = UserProfileUseCase(uow_provider=FakeUoWProvider(artisan_repo))

    with pytest.raises(PermissionError):
        await use_case.get_artisan_dashboard_stats(user)


@pytest.mark.asyncio
async def test_get_artisan_dashboard_returns_full_dashboard_payload():
    user = User(
        id=1,
        email="artisan@example.com",
        hashed_password="hashed",
        roles=[Role.ARTISAN],
    )
    artisan_repo = FakeArtisanRepo(artisan=FakeArtisan(user.uuid))
    use_case = UserProfileUseCase(uow_provider=FakeUoWProvider(artisan_repo))

    result = await use_case.get_artisan_dashboard(user)

    assert result.stats.total_jobs == 5
    assert result.is_available is True
    assert len(result.job_requests) == 1
    assert result.profile_overview.profession == "Plumber"
    assert len(result.past_bookings) == 1
