"""Comment business logic: create, list, read, update, and soft-delete comments."""

from fastapi import HTTPException, status
from sqlalchemy.orm import Session, joinedload

from app.models.comment import Comment
from app.models.post import Post


def _get_visible_post_or_404(db: Session, post_id: int) -> Post:
    """Fetch a post by id, treating soft-deleted posts as not found.

    A comment can only be created on / listed for an existing, non-deleted post.
    """
    post = db.query(Post).filter(Post.id == post_id, Post.is_deleted.is_(False)).first()
    if post is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Post not found",
        )
    return post


def _get_visible_comment_or_404(db: Session, comment_id: int) -> Comment:
    """Fetch a comment by id.

    Treats a soft-deleted comment, or a comment on a soft-deleted post, as
    not found — comments belonging to deleted posts must never be returned.
    """
    comment = (
        db.query(Comment)
        .join(Post, Comment.post_id == Post.id)
        .options(joinedload(Comment.author))
        .filter(
            Comment.id == comment_id,
            Comment.is_deleted.is_(False),
            Post.is_deleted.is_(False),
        )
        .first()
    )
    if comment is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Comment not found",
        )
    return comment


def create_comment(db: Session, post_id: int, user_id: int, content: str) -> Comment:
    """Create a new comment authored by `user_id` on `post_id`.

    Raises 404 if the post doesn't exist or is soft-deleted.
    """
    _get_visible_post_or_404(db, post_id)

    comment = Comment(post_id=post_id, user_id=user_id, content=content)
    db.add(comment)
    db.commit()
    db.refresh(comment)
    # Load the author relationship for the response schema.
    _ = comment.author
    return comment


def get_comments_for_post(db: Session, post_id: int) -> list[Comment]:
    """Return every non-deleted comment on a non-deleted post, oldest first.

    Raises 404 if the post doesn't exist or is soft-deleted.
    """
    _get_visible_post_or_404(db, post_id)

    return (
        db.query(Comment)
        .options(joinedload(Comment.author))
        .filter(Comment.post_id == post_id, Comment.is_deleted.is_(False))
        .order_by(Comment.created_at.asc())
        .all()
    )


def get_comment_by_id(db: Session, comment_id: int) -> Comment:
    """Return a single non-deleted comment (on a non-deleted post). 404 if missing."""
    return _get_visible_comment_or_404(db, comment_id)


def update_own_comment(db: Session, comment_id: int, user_id: int, content: str) -> Comment:
    """Update the content of a comment the caller owns.

    Raises 404 if the comment doesn't exist (or is soft-deleted / on a
    soft-deleted post), and 403 if the caller isn't the comment's author.
    """
    comment = _get_visible_comment_or_404(db, comment_id)
    if comment.user_id != user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You can only update your own comments",
        )

    comment.content = content
    db.commit()
    db.refresh(comment)
    _ = comment.author
    return comment


def delete_own_comment(db: Session, comment_id: int, user_id: int) -> None:
    """Soft-delete a comment the caller owns.

    Raises 404 if the comment doesn't exist (or is already soft-deleted / on
    a soft-deleted post), and 403 if the caller isn't the author.
    """
    comment = _get_visible_comment_or_404(db, comment_id)
    if comment.user_id != user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You can only delete your own comments",
        )

    comment.is_deleted = True
    db.commit()


def admin_delete_comment(db: Session, comment_id: int) -> None:
    """Soft-delete any comment, regardless of ownership. Raises 404 if missing."""
    comment = _get_visible_comment_or_404(db, comment_id)
    comment.is_deleted = True
    db.commit()