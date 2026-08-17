"""Authentication schemas: register/login requests and their responses."""

from pydantic import BaseModel, EmailStr, Field

from app.schemas.user import UserResponse


class RegisterRequest(BaseModel):
    """POST /api/auth/register body."""

    email: EmailStr
    # bcrypt only uses the first 72 bytes of a password; capping the input
    # length keeps that limit visible as a validation error instead of silent
    # truncation.
    password: str = Field(min_length=8, max_length=72)


class LoginRequest(BaseModel):
    """POST /api/auth/login body."""

    email: EmailStr
    password: str = Field(min_length=1, max_length=72)


class TokenResponse(BaseModel):
    """POST /api/auth/login response — the JWT plus the caller's own safe profile."""

    access_token: str
    token_type: str = "bearer"
    user: UserResponse