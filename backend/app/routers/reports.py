"""Report endpoints: file a report on a post, view your own reports, and
(admin only) list every report and update its moderation status.
"""

from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.core.dependencies import get_current_active_user, get_current_admin_user, get_db
from app.models.report import Report
from app.models.user import User
from app.schemas.report import ReportCreate, ReportResponse, ReportUpdate
from app.services.report_service import (
    create_report,
    get_all_reports,
    get_my_reports,
    get_report_by_id,
    update_report_status,
)

router = APIRouter()


@router.post(
    "/posts/{post_id}/reports",
    response_model=ReportResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_report_endpoint(
    post_id: int,
    payload: ReportCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
) -> Report:
    """File a report against a post. The reporter is always the authenticated caller.

    Raises 404 if the post doesn't exist or is soft-deleted. The new report
    always starts as PENDING with reviewed_at/reviewed_by unset.
    """
    return create_report(db, post_id=post_id, reporter_id=current_user.id, reason=payload.reason)


@router.get("/reports/my", response_model=list[ReportResponse])
def list_my_reports_endpoint(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
) -> list[Report]:
    """List every report filed by the authenticated user."""
    return get_my_reports(db, reporter_id=current_user.id)


@router.get("/reports", response_model=list[ReportResponse])
def list_all_reports_endpoint(
    db: Session = Depends(get_db),
    _admin: User = Depends(get_current_admin_user),
) -> list[Report]:
    """List every report in the system. Admin only."""
    return get_all_reports(db)


@router.get("/reports/{report_id}", response_model=ReportResponse)
def get_report_endpoint(
    report_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
) -> Report:
    """Fetch a single report.

    A normal user may only view their own report (403 otherwise). Admins may
    view any report. 404 if the report doesn't exist.
    """
    return get_report_by_id(db, report_id, current_user)


@router.put("/reports/{report_id}", response_model=ReportResponse)
def update_report_endpoint(
    report_id: int,
    payload: ReportUpdate,
    db: Session = Depends(get_db),
    current_admin: User = Depends(get_current_admin_user),
) -> Report:
    """Update a report's moderation status. Admin only.

    reviewed_at is set to now and reviewed_by is set to the reviewing
    admin's own id automatically — neither can be supplied by the client.
    404 if the report doesn't exist.
    """
    return update_report_status(
        db, report_id, admin_id=current_admin.id, new_status=payload.status
    )