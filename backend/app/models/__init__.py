"""SQLAlchemy database models.

Importing every model module here ensures each model class registers itself on
Base.metadata as soon as `app.models` is imported. This is what lets Alembic's
autogenerate (and `Base.metadata.create_all()`) discover all seven tables, and
lets SQLAlchemy resolve the string-based relationship() references between
models regardless of import order.
"""

from app.models.category import Category
from app.models.comment import Comment
from app.models.like import Like
from app.models.notification import Notification, NotificationType
from app.models.post import Post
from app.models.report import Report, ReportStatus
from app.models.user import User, UserRole

__all__ = [
    "User",
    "UserRole",
    "Category",
    "Post",
    "Comment",
    "Like",
    "Report",
    "ReportStatus",
    "Notification",
    "NotificationType",
]