"""Post schemas."""

from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field

from app.schemas.user import PublicUserResponse


class PostCreate(BaseModel):
    """POST /api/posts body.

    `user_id` is deliberately absent — the author always comes from the JWT
    (the authenticated caller), never from client input.
    """

    category_id: int
    content: str = Field(min_length=1, max_length=10000)


class PostUpdate(BaseModel):
    """PUT /api/posts/{post_id} body.

    Only `content` is editable. `category_id` is intentionally not included
    here — re-categorizing isn't part of this step's scope — and id, user_id,
    created_at, updated_at, is_deleted can never be set by a client since
    they simply aren't fields on this schema.
    """

    content: str = Field(min_length=1, max_length=10000)


class PostResponse(BaseModel):
    """Safe representation of a post.

    The author is identified only by `anonymous_handle` (via
    `PublicUserResponse`) — never email, password_hash, or any other private
    account field.
    """

    model_config = ConfigDict(from_attributes=True)

    id: int
    category_id: int
    content: str
    created_at: datetime
    updated_at: datetime
    author: PublicUserResponse