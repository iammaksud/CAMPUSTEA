"""Like schemas."""

from pydantic import BaseModel


class LikeCountResponse(BaseModel):
    """GET /api/posts/{post_id}/likes response."""

    like_count: int


class LikedStatusResponse(BaseModel):
    """GET /api/posts/{post_id}/liked response."""

    liked: bool