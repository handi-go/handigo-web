from enum import StrEnum
from typing import Annotated

from pydantic import BaseModel, Field

INT64_MIN = -(2**63)
INT64_MAX = 2**63 - 1

Int64 = Annotated[int, Field(ge=INT64_MIN, le=INT64_MAX)]
NonNegativeInt64 = Annotated[int, Field(ge=0, le=INT64_MAX)]


class BookingStatus(StrEnum):
    NEW = "new"
    PENDING = "pending"
    DECLINED = "declined"
    ACCEPTED = "accepted"
    COMPLETED = "completed"
    REVISION = "revision"


class DashboardStats(BaseModel):
    active_jobs: NonNegativeInt64
    total_jobs: NonNegativeInt64
    total_earnings: NonNegativeInt64
    rating: Annotated[float, Field(ge=0.0, le=5.0)]
    review_count: NonNegativeInt64


class CustomerJobRequest(BaseModel):
    booking_id: Int64
    customer_name: str
    location: str
    is_verified: bool = False


class ArtisanProfileOverview(BaseModel):
    artisan_id: Int64
    full_name: str
    profession: str
    location: str
    email: str


class PastBooking(BaseModel):
    booking_id: Int64
    customer_name: str
    location: str
    status: BookingStatus


class ArtisanDashboard(BaseModel):
    stats: DashboardStats
    is_available: bool
    job_requests: list[CustomerJobRequest]
    profile_overview: ArtisanProfileOverview
    past_bookings: list[PastBooking]
