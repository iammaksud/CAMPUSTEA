"""User profile business logic: read/update the authenticated user's own profile."""

from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.models.user import User


def update_user_profile(db: Session, user: User, anonymous_handle: str) -> User:
    """Update the caller's own anonymous_handle.

    Raises 409 if the requested handle is already taken by a different
    account. If the handle is unchanged, this is a no-op that still returns
    the current user.
    """
    if anonymous_handle != user.anonymous_handle:
        existing = (
            db.query(User)
            .filter(User.anonymous_handle == anonymous_handle, User.id != user.id)
            .first()
        )
        if existing is not None:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="That anonymous handle is already taken",
            )
        user.anonymous_handle = anonymous_handle
        db.commit()
        db.refresh(user)

    return user