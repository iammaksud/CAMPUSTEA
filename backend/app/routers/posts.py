"""Post endpoints: create/list/read/update/delete posts.

All endpoints require authentication. Reads are open to any authenticated
user; create requires authentication (author = caller); update/delete are
restricted to the post's own author, except admins may also delete any post.
"""

from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.core.dependencies import get_current_active_user, get_db
from app.models.post import Post
from app.models.user import User, UserRole
from app.schemas.post import PostCreate, PostResponse, PostUpdate
from app.services.post_service import (
    admin_delete_post,
    create_post,
    delete_own_post,
    get_all_posts,
    get_post_by_id,
    update_own_post,
)

router = APIRouter()


@router.post("/posts", response_model=PostResponse, status_code=status.HTTP_201_CREATED)
def create_post_endpoint(
    payload: PostCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
) -> Post:
    """Create a new post. The author is always the authenticated caller.

    Raises 404 if `category_id` doesn't reference an existing category.
    """
    return create_post(
        db,
        user_id=current_user.id,
        category_id=payload.category_id,
        content=payload.content,
    )


@router.get("/posts", response_model=list[PostResponse])
def list_posts_endpoint(
    db: Session = Depends(get_db),
    _user: User = Depends(get_current_active_user),
) -> list[Post]:
    """List every non-deleted post, most recent first."""
    return get_all_posts(db)


@router.get("/posts/{post_id}", response_model=PostResponse)
def get_post_endpoint(
    post_id: int,
    db: Session = Depends(get_db),
    _user: User = Depends(get_current_active_user),
) -> Post:
    """Fetch a single post by id. 404 if missing or soft-deleted."""
    return get_post_by_id(db, post_id)


@router.put("/posts/{post_id}", response_model=PostResponse)
def update_post_endpoint(
    post_id: int,
    payload: PostUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
) -> Post:
    """Update a post's content. Only the post's own author may do this.

    404 if the post doesn't exist (or is already soft-deleted); 403 if the
    caller isn't the author.
    """
    return update_own_post(db, post_id, user_id=current_user.id, content=payload.content)


@router.delete("/posts/{post_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_post_endpoint(
    post_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
) -> None:
    """Soft-delete a post (sets is_deleted = true; never a hard delete).

    The post's own author can delete it. Admins can delete any post. A
    normal user attempting to delete someone else's post gets 403. 404 if
    the post doesn't exist (or is already soft-deleted).
    """
    if current_user.role == UserRole.ADMIN:
        admin_delete_post(db, post_id)
    else:
        delete_own_post(db, post_id, user_id=current_user.id)