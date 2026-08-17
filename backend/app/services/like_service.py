"""Like business logic: like/unlike a post, count likes, check liked status."""

from fastapi import HTTPException, status
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.models.like import Like
from app.models.post import Post


def _get_visible_post_or_404(db: Session, post_id: int) -> Post:
    """Fetch a post by id, treating soft-deleted posts as not found.

    A soft-deleted post cannot be liked, and its likes are not accessible
    through the API.
    """
    post = db.query(Post).filter(Post.id == post_id, Post.is_deleted.is_(False)).first()
    if post is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Post not found",
        )
    return post


def like_post(db: Session, post_id: int, user_id: int) -> Like:
    """Like a post as `user_id`.

    Raises 404 if the post doesn't exist or is soft-deleted. Raises 409 if
    the user has already liked this post. The database-level unique
    constraint on (post_id, user_id) is the authoritative guard against a
    duplicate — this pre-check just turns that into a clean 409 instead of a
    raw IntegrityError under normal (non-racing) conditions.
    """
    _get_visible_post_or_404(db, post_id)

    existing = (
        db.query(Like).filter(Like.post_id == post_id, Like.user_id == user_id).first()
    )
    if existing is not None:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="You have already liked this post",
        )

    like = Like(post_id=post_id, user_id=user_id)
    db.add(like)
    try:
        db.commit()
    except IntegrityError:
        # A concurrent request won the race and inserted the same
        # (post_id, user_id) pair first — the unique constraint caught it.
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="You have already liked this post",
        )
    db.refresh(like)
    return like


def unlike_post(db: Session, post_id: int, user_id: int) -> None:
    """Remove `user_id`'s own like from a post.

    Raises 404 if the post doesn't exist/is soft-deleted, or if this user
    has not liked it. Only ever deletes the caller's own like row — the
    query is always scoped to `user_id`, so another user's like can never
    be touched here, regardless of role.
    """
    _get_visible_post_or_404(db, post_id)

    like = (
        db.query(Like).filter(Like.post_id == post_id, Like.user_id == user_id).first()
    )
    if like is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="You have not liked this post",
        )

    db.delete(like)
    db.commit()


def get_like_count(db: Session, post_id: int) -> int:
    """Return the number of likes on a post. Raises 404 if missing/soft-deleted."""
    _get_visible_post_or_404(db, post_id)
    return db.query(Like).filter(Like.post_id == post_id).count()


def get_liked_status(db: Session, post_id: int, user_id: int) -> bool:
    """Return whether `user_id` has liked this post. Raises 404 if missing/soft-deleted."""
    _get_visible_post_or_404(db, post_id)
    return (
        db.query(Like).filter(Like.post_id == post_id, Like.user_id == user_id).first()
        is not None
    )