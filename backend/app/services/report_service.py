"""Report business logic: file reports, list/read them, and admin review."""

from datetime import datetime, timezone

from fastapi import HTTPException, status
from sqlalchemy.orm import Session, joinedload

from app.models.post import Post
from app.models.report import Report, ReportStatus
from app.models.user import User, UserRole


def _get_visible_post_or_404(db: Session, post_id: int) -> Post:
    """Fetch a post by id, treating soft-deleted posts as not found.

    A soft-deleted post cannot be reported.
    """
    post = db.query(Post).filter(Post.id == post_id, Post.is_deleted.is_(False)).first()
    if post is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Post not found",
        )
    return post


def _get_report_or_404(db: Session, report_id: int) -> Report:
    """Fetch a report by id.

    Existing reports remain retrievable even if their post is later
    soft-deleted — reports are never removed when a post is deleted, and
    moderators still need to review them.
    """
    report = (
        db.query(Report)
        .options(joinedload(Report.reporter))
        .filter(Report.id == report_id)
        .first()
    )
    if report is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Report not found",
        )
    return report


def create_report(db: Session, post_id: int, reporter_id: int, reason: str) -> Report:
    """File a new report against a post, authored by `reporter_id`.

    Raises 404 if the post doesn't exist or is soft-deleted. New reports
    always start at status=PENDING with reviewed_at/reviewed_by unset,
    regardless of anything a client sends.
    """
    _get_visible_post_or_404(db, post_id)

    report = Report(
        post_id=post_id,
        reporter_id=reporter_id,
        reason=reason,
        status=ReportStatus.PENDING,
        reviewed_at=None,
        reviewed_by=None,
    )
    db.add(report)
    db.commit()
    db.refresh(report)
    # Load the reporter relationship for the response schema.
    _ = report.reporter
    return report


def get_my_reports(db: Session, reporter_id: int) -> list[Report]:
    """Return every report filed by `reporter_id`, most recent first."""
    return (
        db.query(Report)
        .options(joinedload(Report.reporter))
        .filter(Report.reporter_id == reporter_id)
        .order_by(Report.created_at.desc())
        .all()
    )


def get_report_by_id(db: Session, report_id: int, current_user: User) -> Report:
    """Return a single report.

    A normal user may only view their own report (403 otherwise). Admins may
    view any report. Raises 404 if the report doesn't exist.
    """
    report = _get_report_or_404(db, report_id)
    if current_user.role != UserRole.ADMIN and report.reporter_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You can only view your own reports",
        )
    return report


def get_all_reports(db: Session) -> list[Report]:
    """Return every report, most recent first. Admin only (enforced by the router)."""
    return (
        db.query(Report)
        .options(joinedload(Report.reporter))
        .order_by(Report.created_at.desc())
        .all()
    )


def update_report_status(
    db: Session, report_id: int, admin_id: int, new_status: ReportStatus
) -> Report:
    """Update a report's moderation status. Admin only (enforced by the router).

    Always sets `reviewed_at` to now and `reviewed_by` to the reviewing
    admin's own id — both are server-computed, never accepted from the
    client. Raises 404 if the report doesn't exist.
    """
    report = _get_report_or_404(db, report_id)

    report.status = new_status
    report.reviewed_at = datetime.now(timezone.utc)
    report.reviewed_by = admin_id

    db.commit()
    db.refresh(report)
    _ = report.reporter
    return report