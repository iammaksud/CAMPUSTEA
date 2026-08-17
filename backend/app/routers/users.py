"""User profile endpoints: view and update the authenticated user's own profile."""

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.dependencies import get_current_active_user, get_db
from app.models.user import User
from app.schemas.user import UserResponse, UserUpdate
from app.services.user_service import update_user_profile

router = APIRouter()


@router.get("/users/me", response_model=UserResponse)
def read_my_profile(current_user: User = Depends(get_current_active_user)) -> User:
    """Return the authenticated user's own profile. Never includes password_hash.

    Rejects unauthenticated requests (401) via `get_current_active_user`.
    """
    return current_user


@router.put("/users/me", response_model=UserResponse)
def update_my_profile(
    payload: UserUpdate,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db),
) -> User:
    """Update the authenticated user's own profile.

    Only `anonymous_handle` is editable here — id, role, password_hash,
    is_active, email, and created_at cannot be changed through this endpoint,
    since `UserUpdate` doesn't accept those fields at all (any such fields in
    the request body are silently ignored, not applied).
    """
    return update_user_profile(db, current_user, anonymous_handle=payload.anonymous_handle)