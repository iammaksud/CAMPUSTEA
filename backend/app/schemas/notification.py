"""Notification schemas."""

from datetime import datetime

from pydantic import BaseModel, ConfigDict

from app.models.notification import NotificationType


class NotificationResponse(BaseModel):
    """Safe representation of a notification.

    Always belongs to the authenticated caller, so `user_id` is omitted as
    redundant/unnecessary rather than exposed. Never includes any private
    account field of another user.
    """

    model_config = ConfigDict(from_attributes=True)

    id: int
    type: NotificationType
    message: str
    is_read: bool
    created_at: datetime


class MarkAllReadResponse(BaseModel):
    """PUT /api/notifications/read-all response."""

    updated_count: int