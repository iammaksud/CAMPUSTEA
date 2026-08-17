"""Post model.

Fields:
- id (PK)
- user_id (FK -> users, cascade on delete)
- category_id (FK -> categories, restrict on delete)
- content
- is_deleted (soft delete)
- created_at, updated_at

Relationships:
- author (User), category (Category)
- comments, likes, reports
"""

from typing import TYPE_CHECKING, List

from sqlalchemy import Boolean, ForeignKey, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.base import Base, TimestampMixin

if TYPE_CHECKING:
    from app.models.category import Category
    from app.models.comment import Comment
    from app.models.like import Like
    from app.models.report import Report
    from app.models.user import User


class Post(Base, TimestampMixin):
    """An anonymous post authored by a user, belonging to a category."""

    __tablename__ = "posts"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"), index=True, nullable=False
    )
    category_id: Mapped[int] = mapped_column(
        ForeignKey("categories.id", ondelete="RESTRICT"), index=True, nullable=False
    )
    content: Mapped[str] = mapped_column(Text, nullable=False)
    is_deleted: Mapped[bool] = mapped_column(
        Boolean, server_default="0", index=True, nullable=False
    )

    author: Mapped["User"] = relationship(
        "User", back_populates="posts", foreign_keys=[user_id]
    )
    category: Mapped["Category"] = relationship("Category", back_populates="posts")
    comments: Mapped[List["Comment"]] = relationship(
        "Comment", back_populates="post", cascade="all, delete-orphan"
    )
    likes: Mapped[List["Like"]] = relationship(
        "Like", back_populates="post", cascade="all, delete-orphan"
    )
    reports: Mapped[List["Report"]] = relationship(
        "Report",
        back_populates="post",
        foreign_keys="Report.post_id",
        cascade="all, delete-orphan",
    )

    def __repr__(self) -> str:  # pragma: no cover
        return f"<Post id={self.id} user_id={self.user_id} category_id={self.category_id}>"