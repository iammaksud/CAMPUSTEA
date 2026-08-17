"""Notification business logic: list and mark-as-read for the authenticated
user's own notifications.

There is no create/delete endpoint here — notifications are system-generated
(by other backend activity), not authored directly by users through this
API, matching the existing frontend, which only lists notifications and
marks them read.
"""

from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.models.notification import Notification


def get_my_notifications(db: Session, user_id: int) -> list[Notification]:
    """Return every notification belonging to `user_id`, most recent first."""
    return (
        db.query(Notification)
        .filter(Notification.user_id == user_id)
        .order_by(Notification.created_at.desc())
        .all()
    )


def _get_own_notification_or_404(db: Session, notification_id: int, user_id: int) -> Notification:
    """Fetch a notification by id, scoped strictly to its owner.

    The lookup is always filtered by `user_id`, so a notification belonging
    to someone else is indistinguishable from one that doesn't exist at all
    — notifications are strictly private with no shared/public visibility
    and no admin override.
    """
    notification = (
        db.query(Notification)
        .filter(Notification.id == notification_id, Notification.user_id == user_id)
        .first()
    )
    if notification is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Notification not found",
        )
    return notification


def mark_notification_read(db: Session, notification_id: int, user_id: int) -> Notification:
    """Mark a single notification (owned by `user_id`) as read.

    Raises 404 if it doesn't exist or belongs to a different user. Idempotent
    — marking an already-read notification as read again is a harmless no-op.
    """
    notification = _get_own_notification_or_404(db, notification_id, user_id)
    if not notification.is_read:
        notification.is_read = True
        db.commit()
        db.refresh(notification)
    return notification


def mark_all_notifications_read(db: Session, user_id: int) -> int:
    """Mark every unread notification belonging to `user_id` as read.

    Returns the number of notifications that were actually updated.
    """
    updated_count = (
        db.query(Notification)
        .filter(Notification.user_id == user_id, Notification.is_read.is_(False))
        .update({"is_read": True}, synchronize_session=False)
    )
    db.commit()
    return updated_count