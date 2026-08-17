"""Post business logic: create, list, read, update, and soft-delete posts."""

from fastapi import HTTPException, status
from sqlalchemy.orm import Session, joinedload

from app.models.category import Category
from app.models.post import Post


def _get_visible_post_or_404(db: Session, post_id: int) -> Post:
    """Fetch a post by id, treating soft-deleted posts as not found."""
    post = (
        db.query(Post)
        .options(joinedload(Post.author))
        .filter(Post.id == post_id, Post.is_deleted.is_(False))
        .first()
    )
    if post is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Post not found",
        )
    return post


def create_post(db: Session, user_id: int, category_id: int, content: str) -> Post:
    """Create a new post authored by `user_id`.

    Raises 404 if `category_id` doesn't reference an existing category.
    """
    category = db.get(Category, category_id)
    if category is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Category not found",
        )

    post = Post(user_id=user_id, category_id=category_id, content=content)
    db.add(post)
    db.commit()
    db.refresh(post)
    # Load the author relationship for the response schema.
    _ = post.author
    return post


def get_all_posts(db: Session) -> list[Post]:
    """Return every non-deleted post, most recent first."""
    return (
        db.query(Post)
        .options(joinedload(Post.author))
        .filter(Post.is_deleted.is_(False))
        .order_by(Post.created_at.desc())
        .all()
    )


def get_post_by_id(db: Session, post_id: int) -> Post:
    """Return a single non-deleted post. Raises 404 if missing or soft-deleted."""
    return _get_visible_post_or_404(db, post_id)


def update_own_post(db: Session, post_id: int, user_id: int, content: str) -> Post:
    """Update the content of a post the caller owns.

    Raises 404 if the post doesn't exist (or is already soft-deleted), and
    403 if the caller isn't the post's author.
    """
    post = _get_visible_post_or_404(db, post_id)
    if post.user_id != user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You can only update your own posts",
        )

    post.content = content
    db.commit()
    db.refresh(post)
    _ = post.author
    return post


def delete_own_post(db: Session, post_id: int, user_id: int) -> None:
    """Soft-delete a post the caller owns.

    Raises 404 if the post doesn't exist (or is already soft-deleted), and
    403 if the caller isn't the post's author.
    """
    post = _get_visible_post_or_404(db, post_id)
    if post.user_id != user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You can only delete your own posts",
        )

    post.is_deleted = True
    db.commit()


def admin_delete_post(db: Session, post_id: int) -> None:
    """Soft-delete any post, regardless of ownership. Raises 404 if missing."""
    post = _get_visible_post_or_404(db, post_id)
    post.is_deleted = True
    db.commit()