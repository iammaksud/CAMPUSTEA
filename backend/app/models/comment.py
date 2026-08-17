"""Comment model.

Fields:
- id (PK)
- post_id (FK -> posts, cascade on delete)
- user_id (FK -> users, cascade on delete)
- content
- is_deleted (soft delete)
- created_at, updated_at

Relationships:
- post (Post), author (User)
"""

from typing import TYPE_CHECKING

from sqlalchemy import Boolean, ForeignKey, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.base import Base, TimestampMixin

if TYPE_CHECKING:
    from app.models.post import Post
    from app.models.user import User


class Comment(Base, TimestampMixin):
    """A comment authored by a user on a post."""

    __tablename__ = "comments"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    post_id: Mapped[int] = mapped_column(
        ForeignKey("posts.id", ondelete="CASCADE"), index=True, nullable=False
    )
    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"), index=True, nullable=False
    )
    content: Mapped[str] = mapped_column(Text, nullable=False)
    is_deleted: Mapped[bool] = mapped_column(
        Boolean, server_default="0", index=True, nullable=False
    )

    post: Mapped["Post"] = relationship("Post", back_populates="comments")
    author: Mapped["User"] = relationship(
        "User", back_populates="comments", foreign_keys=[user_id]
    )

    def __repr__(self) -> str:  # pragma: no cover
        return f"<Comment id={self.id} post_id={self.post_id} user_id={self.user_id}>"