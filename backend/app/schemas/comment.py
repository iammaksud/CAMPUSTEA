"""Comment schemas."""

from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field

from app.schemas.user import PublicUserResponse


class CommentCreate(BaseModel):
    """POST /api/posts/{post_id}/comments body.

    `post_id` comes from the URL and `user_id` always comes from the JWT —
    neither is accepted here, so a client can never spoof either.
    """

    content: str = Field(min_length=1, max_length=5000)


class CommentUpdate(BaseModel):
    """PUT /api/comments/{comment_id} body.

    Only `content` is editable. id, post_id, user_id, created_at, updated_at,
    and is_deleted can never be set by a client since they simply aren't
    fields on this schema.
    """

    content: str = Field(min_length=1, max_length=5000)


class CommentResponse(BaseModel):
    """Safe representation of a comment.

    The author is identified only by `anonymous_handle` (via
    `PublicUserResponse`) — never email, password_hash, or any other private
    account field.
    """

    model_config = ConfigDict(from_attributes=True)

    id: int
    post_id: int
    content: str
    created_at: datetime
    updated_at: datetime
    author: PublicUserResponse