"""Like endpoints: like/unlike a post, get its like count, and check the
caller's own liked status.

All endpoints require authentication. `user_id` always comes from the JWT —
never from the request body — so a user can only create or remove their own
like, regardless of role.
"""

from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.core.dependencies import get_current_active_user, get_db
from app.models.user import User
from app.schemas.like import LikeCountResponse, LikedStatusResponse
from app.services.like_service import (
    get_like_count,
    get_liked_status,
    like_post,
    unlike_post,
)

router = APIRouter()


@router.post(
    "/posts/{post_id}/like",
    response_model=LikedStatusResponse,
    status_code=status.HTTP_201_CREATED,
)
def like_post_endpoint(
    post_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
) -> LikedStatusResponse:
    """Like a post as the authenticated user.

    404 if the post doesn't exist or is soft-deleted. 409 if already liked.
    """
    like_post(db, post_id=post_id, user_id=current_user.id)
    return LikedStatusResponse(liked=True)


@router.delete("/posts/{post_id}/like", status_code=status.HTTP_204_NO_CONTENT)
def unlike_post_endpoint(
    post_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
) -> None:
    """Remove the authenticated user's own like from a post.

    404 if the post doesn't exist/is soft-deleted, or if this user hasn't
    liked it. Can never remove another user's like.
    """
    unlike_post(db, post_id=post_id, user_id=current_user.id)


@router.get("/posts/{post_id}/likes", response_model=LikeCountResponse)
def get_like_count_endpoint(
    post_id: int,
    db: Session = Depends(get_db),
    _user: User = Depends(get_current_active_user),
) -> LikeCountResponse:
    """Return the like count for a post. 404 if missing or soft-deleted.

    Exposes only a count — no per-liker identity or private user information.
    """
    return LikeCountResponse(like_count=get_like_count(db, post_id))


@router.get("/posts/{post_id}/liked", response_model=LikedStatusResponse)
def get_liked_status_endpoint(
    post_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
) -> LikedStatusResponse:
    """Return whether the authenticated user has liked this post."""
    return LikedStatusResponse(liked=get_liked_status(db, post_id, user_id=current_user.id))