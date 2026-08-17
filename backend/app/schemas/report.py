"""Report schemas."""

from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict, Field

from app.models.report import ReportStatus
from app.schemas.user import PublicUserResponse


class ReportCreate(BaseModel):
    """POST /api/posts/{post_id}/reports body.

    `post_id` comes from the URL and `reporter_id` always comes from the
    JWT — neither is accepted here, so a client can never spoof either.
    """

    reason: str = Field(min_length=1, max_length=2000)


class ReportUpdate(BaseModel):
    """PUT /api/reports/{report_id} body — admin only.

    Only `status` is settable by the client, and it must be one of the
    existing `ReportStatus` enum values. `reviewed_at` and `reviewed_by` are
    always server-computed (current time / the authenticated admin's own
    id) — never accepted from the request.
    """

    status: ReportStatus


class ReportResponse(BaseModel):
    """Safe representation of a report.

    The reporter is identified only by `anonymous_handle` (via
    `PublicUserResponse`) — never email, password_hash, or any other private
    account field. `reviewed_by` is exposed as a plain user id (which admin
    reviewed it), not a nested profile.
    """

    model_config = ConfigDict(from_attributes=True)

    id: int
    post_id: int
    reason: str
    status: ReportStatus
    created_at: datetime
    reviewed_at: Optional[datetime] = None
    reviewed_by: Optional[int] = None
    reporter: PublicUserResponse