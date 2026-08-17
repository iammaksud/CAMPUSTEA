"""User model.

Fields:
- id (PK)
- email (unique)
- password_hash (never exposed)
- anonymous_handle (unique, e.g. "Anonymous Owl")
- role (user | admin)
- is_active
- created_at, updated_at

Relationships:
- posts, comments, likes, reports (as reporter), notifications
"""

import enum
from typing import TYPE_CHECKING, List

from sqlalchemy import Boolean, Enum, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.base import Base, TimestampMixin

if TYPE_CHECKING:
    from app.models.comment import Comment
    from app.models.like import Like
    from app.models.notification import Notification
    from app.models.post import Post
    from app.models.report import Report


class UserRole(str, enum.Enum):
    """Account role. Matches the `userrole` DB enum."""

    USER = "USER"
    ADMIN = "ADMIN"


class User(Base, TimestampMixin):
    """A registered account. Publicly identified only by `anonymous_handle`."""

    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True, nullable=False)
    password_hash: Mapped[str] = mapped_column(String(255), nullable=False)
    anonymous_handle: Mapped[str] = mapped_column(
        String(100), unique=True, index=True, nullable=False
    )
    role: Mapped[UserRole] = mapped_column(
        Enum(UserRole, name="userrole", native_enum=True),
        server_default=UserRole.USER.value,
        nullable=False,
    )
    is_active: Mapped[bool] = mapped_column(Boolean, server_default="1", nullable=False)

    posts: Mapped[List["Post"]] = relationship(
        "Post",
        back_populates="author",
        foreign_keys="Post.user_id",
        cascade="all, delete-orphan",
    )
    comments: Mapped[List["Comment"]] = relationship(
        "Comment",
        back_populates="author",
        foreign_keys="Comment.user_id",
        cascade="all, delete-orphan",
    )
    likes: Mapped[List["Like"]] = relationship(
        "Like",
        back_populates="user",
        foreign_keys="Like.user_id",
        cascade="all, delete-orphan",
    )
    reports: Mapped[List["Report"]] = relationship(
        "Report",
        back_populates="reporter",
        foreign_keys="Report.reporter_id",
        cascade="all, delete-orphan",
    )
    notifications: Mapped[List["Notification"]] = relationship(
        "Notification",
        back_populates="user",
        foreign_keys="Notification.user_id",
        cascade="all, delete-orphan",
    )

    def __repr__(self) -> str:  # pragma: no cover
        return f"<User id={self.id} anonymous_handle={self.anonymous_handle!r}>"