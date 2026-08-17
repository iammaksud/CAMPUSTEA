"""User schemas."""

from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field

from app.models.user import UserRole


class UserResponse(BaseModel):
    """Safe representation of a user's own account — never includes password_hash.

    This is for the authenticated user's own view (register/login/me/users-me
    responses). It intentionally still includes `email` and the internal `id`,
    since those are private account fields being returned to their owner, not
    exposed publicly. Anywhere a user is shown to *other* users (posts,
    comments, etc.), use `PublicUserResponse` instead — never this schema.
    """

    model_config = ConfigDict(from_attributes=True)

    id: int
    email: str
    anonymous_handle: str
    role: UserRole
    is_active: bool
    created_at: datetime
    updated_at: datetime


class UserUpdate(BaseModel):
    """PUT /api/users/me body.

    `anonymous_handle` is the only field a user may change about themselves
    through this endpoint. Deliberately excludes id, role, password_hash,
    is_active, email, created_at, and updated_at — those are either
    server-managed or handled by dedicated flows (e.g. auth), not this one.
    Any extra/unknown fields sent by a client (e.g. "role", "email") are
    silently ignored rather than applied.
    """

    anonymous_handle: str = Field(min_length=3, max_length=100)


class PublicUserResponse(BaseModel):
    """What other users see about this account — the anonymous identity only.

    Never includes email, password_hash, id, role, or any other private
    account field. This is the schema future post/comment/report schemas
    should embed for an "author" field.
    """

    model_config = ConfigDict(from_attributes=True)

    anonymous_handle: str