"""Report model.

Fields:
- id (PK)
- post_id (FK -> posts, cascade on delete)
- reporter_id (FK -> users, cascade on delete)
- reason
- status (pending | reviewed | resolved | rejected)
- created_at
- reviewed_at (optional)
- reviewed_by (optional FK -> users, set null on delete)

Relationships:
- post (Post), reporter (User), reviewer (User, optional)
"""

import enum
from datetime import datetime
from typing import TYPE_CHECKING, Optional

from sqlalchemy import DateTime, Enum, ForeignKey, Text, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.base import Base

if TYPE_CHECKING:
    from app.models.post import Post
    from app.models.user import User


class ReportStatus(str, enum.Enum):
    """Moderation status of a report. Matches the `reportstatus` DB enum."""

    PENDING = "PENDING"
    REVIEWED = "REVIEWED"
    RESOLVED = "RESOLVED"
    REJECTED = "REJECTED"


class Report(Base):
    """A user-filed report against a post, reviewed by an admin."""

    __tablename__ = "reports"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    post_id: Mapped[int] = mapped_column(
        ForeignKey("posts.id", ondelete="CASCADE"), index=True, nullable=False
    )
    reporter_id: Mapped[int] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"), index=True, nullable=False
    )
    reason: Mapped[str] = mapped_column(Text, nullable=False)
    status: Mapped[ReportStatus] = mapped_column(
        Enum(ReportStatus, name="reportstatus", native_enum=True),
        server_default=ReportStatus.PENDING.value,
        index=True,
        nullable=False,
    )
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )
    reviewed_at: Mapped[Optional[datetime]] = mapped_column(
        DateTime(timezone=True), nullable=True
    )
    reviewed_by: Mapped[Optional[int]] = mapped_column(
        ForeignKey("users.id", ondelete="SET NULL"), index=True, nullable=True
    )

    post: Mapped["Post"] = relationship(
        "Post", back_populates="reports", foreign_keys=[post_id]
    )
    reporter: Mapped["User"] = relationship(
        "User", back_populates="reports", foreign_keys=[reporter_id]
    )
    reviewer: Mapped[Optional["User"]] = relationship(
        "User", foreign_keys=[reviewed_by]
    )

    def __repr__(self) -> str:  # pragma: no cover
        return f"<Report id={self.id} post_id={self.post_id} status={self.status}>"