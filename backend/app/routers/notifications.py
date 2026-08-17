"""Notification endpoints: list the authenticated user's own notifications and
mark them as read.

All endpoints require authentication and are strictly scoped to the caller's
own notifications — there is no admin override and no other user can ever
view, list, or modify another user's notifications. There is no
create/delete endpoint: notifications are system-generated, not authored by
users through this API.
"""

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.dependencies import get_current_active_user, get_db
from app.models.notification import Notification
from app.models.user import User
from app.schemas.notification import MarkAllReadResponse, NotificationResponse
from app.services.notification_service import (
    get_my_notifications,
    mark_all_notifications_read,
    mark_notification_read,
)

router = APIRouter()


@router.get("/notifications", response_model=list[NotificationResponse])
def list_notifications_endpoint(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
) -> list[Notification]:
    """List every notification belonging to the authenticated user, most recent first."""
    return get_my_notifications(db, user_id=current_user.id)


@router.put("/notifications/read-all", response_model=MarkAllReadResponse)
def mark_all_notifications_read_endpoint(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
) -> MarkAllReadResponse:
    """Mark every one of the authenticated user's unread notifications as read."""
    updated_count = mark_all_notifications_read(db, user_id=current_user.id)
    return MarkAllReadResponse(updated_count=updated_count)


@router.put("/notifications/{notification_id}/read", response_model=NotificationResponse)
def mark_notification_read_endpoint(
    notification_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
) -> Notification:
    """Mark a single notification as read.

    404 if it doesn't exist or doesn't belong to the authenticated user —
    ownership is enforced by scoping the lookup to the caller's own user id
    from the JWT, never trusting any id from the request body.
    """
    return mark_notification_read(db, notification_id, user_id=current_user.id)