"""Like model.

Fields:
- id (PK)
- post_id (FK -> posts, cascade on delete)
- user_id (FK -> users, cascade on delete)
- created_at

Constraints:
- unique (post_id, user_id) -- one like per user per post

Relationships:
- post (Post), user (User)
"""

from datetime import datetime
from typing import TYPE_CHECKING

from sqlalchemy import DateTime, ForeignKey, UniqueConstraint, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.base import Base

if TYPE_CHECKING:
    from app.models.post import Post
    from app.models.user import User


class Like(Base):
    """A single user's like on a single post."""

    __tablename__ = "likes"
    __table_args__ = (
        UniqueConstraint("post_id", "user_id", name="uq_likes_post_id_user_id"),
    )

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    post_id: Mapped[int] = mapped_column(
        ForeignKey("posts.id", ondelete="CASCADE"), index=True, nullable=False
    )
    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"), index=True, nullable=False
    )
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )

    post: Mapped["Post"] = relationship("Post", back_populates="likes")
    user: Mapped["User"] = relationship(
        "User", back_populates="likes", foreign_keys=[user_id]
    )

    def __repr__(self) -> str:  # pragma: no cover
        return f"<Like id={self.id} post_id={self.post_id} user_id={self.user_id}>"