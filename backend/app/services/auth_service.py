"""Authentication business logic: registration, login, and anonymous handle generation."""

import random

from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.core.security import create_access_token, hash_password, verify_password
from app.models.user import User

_HANDLE_ANIMALS = [
    "Otter", "Panda", "Fox", "Owl", "Koala", "Falcon", "Badger", "Lynx",
    "Raven", "Heron", "Wolf", "Hedgehog", "Sparrow", "Tiger", "Dolphin",
    "Penguin", "Rabbit", "Squirrel", "Coyote", "Beaver", "Moose", "Gecko",
]


def _generate_anonymous_handle(db: Session) -> str:
    """Generate a unique "Anonymous <Animal>" handle, retrying on collision."""
    for _ in range(50):
        candidate = f"Anonymous {random.choice(_HANDLE_ANIMALS)}"
        exists = db.query(User).filter(User.anonymous_handle == candidate).first()
        if exists is None:
            return candidate

    # Extremely unlikely fallback if the whole animal pool is already taken.
    for _ in range(50):
        candidate = f"Anonymous {random.choice(_HANDLE_ANIMALS)}{random.randint(100, 999)}"
        exists = db.query(User).filter(User.anonymous_handle == candidate).first()
        if exists is None:
            return candidate

    raise HTTPException(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        detail="Could not generate a unique anonymous handle",
    )


def register_user(db: Session, email: str, password: str) -> User:
    """Create a new user account with a hashed password and a generated handle.

    Raises 409 if the email is already registered.
    """
    existing = db.query(User).filter(User.email == email).first()
    if existing is not None:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="An account with this email already exists",
        )

    user = User(
        email=email,
        password_hash=hash_password(password),
        anonymous_handle=_generate_anonymous_handle(db),
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


def authenticate_user(db: Session, email: str, password: str) -> User:
    """Verify credentials and return the matching user.

    Raises 401 for an unknown email or incorrect password (the same error for
    both, so a caller can't use this endpoint to enumerate registered emails),
    and 403 if the account has been deactivated.
    """
    invalid_credentials = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Incorrect email or password",
        headers={"WWW-Authenticate": "Bearer"},
    )
    user = db.query(User).filter(User.email == email).first()
    if user is None or not verify_password(password, user.password_hash):
        raise invalid_credentials
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Inactive user account",
        )
    return user


def create_user_access_token(user: User) -> str:
    """Issue a JWT access token for an authenticated user."""
    return create_access_token(subject=str(user.id))