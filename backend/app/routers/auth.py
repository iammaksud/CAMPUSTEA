"""Authentication endpoints: register, login, and the current-user profile."""

from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.core.dependencies import get_current_active_user, get_db
from app.models.user import User
from app.schemas.auth import LoginRequest, RegisterRequest, TokenResponse
from app.schemas.user import UserResponse
from app.services.auth_service import (
    authenticate_user,
    create_user_access_token,
    register_user,
)

router = APIRouter()


@router.post("/auth/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def register(payload: RegisterRequest, db: Session = Depends(get_db)) -> User:
    """Create a new account.

    Generates an `anonymous_handle` automatically and hashes the password
    before storing it. Rejects duplicate emails with 409. Never returns
    `password_hash`.
    """
    return register_user(db, email=payload.email, password=payload.password)


@router.post("/auth/login", response_model=TokenResponse)
def login(payload: LoginRequest, db: Session = Depends(get_db)) -> TokenResponse:
    """Verify credentials and issue a JWT access token, plus the caller's own profile."""
    user = authenticate_user(db, email=payload.email, password=payload.password)
    access_token = create_user_access_token(user)
    return TokenResponse(access_token=access_token, user=UserResponse.model_validate(user))


@router.get("/auth/me", response_model=UserResponse)
def read_current_user(current_user: User = Depends(get_current_active_user)) -> User:
    """Return the authenticated user's own safe profile. Rejects unauthenticated requests."""
    return current_user