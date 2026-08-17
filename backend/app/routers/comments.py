"""Comment endpoints: create/list comments under a post, and read/update/delete
individual comments.

All endpoints require authentication. Reads are open to any authenticated
user; create requires authentication (author = caller); update/delete are
restricted to the comment's own author, except admins may also delete any
comment.
"""

from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.core.dependencies import get_current_active_user, get_db
from app.models.comment import Comment
from app.models.user import User, UserRole
from app.schemas.comment import CommentCreate, CommentResponse, CommentUpdate
from app.services.comment_service import (
    admin_delete_comment,
    create_comment,
    delete_own_comment,
    get_comment_by_id,
    get_comments_for_post,
    update_own_comment,
)

router = APIRouter()


@router.post(
    "/posts/{post_id}/comments",
    response_model=CommentResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_comment_endpoint(
    post_id: int,
    payload: CommentCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
) -> Comment:
    """Create a comment on `post_id`. The author is always the authenticated caller.

    Raises 404 if the post doesn't exist or is soft-deleted (deleted posts
    cannot receive new comments).
    """
    return create_comment(db, post_id=post_id, user_id=current_user.id, content=payload.content)


@router.get("/posts/{post_id}/comments", response_model=list[CommentResponse])
def list_comments_endpoint(
    post_id: int,
    db: Session = Depends(get_db),
    _user: User = Depends(get_current_active_user),
) -> list[Comment]:
    """List every non-deleted comment on a post, oldest first.

    Raises 404 if the post doesn't exist or is soft-deleted.
    """
    return get_comments_for_post(db, post_id)


@router.get("/comments/{comment_id}", response_model=CommentResponse)
def get_comment_endpoint(
    comment_id: int,
    db: Session = Depends(get_db),
    _user: User = Depends(get_current_active_user),
) -> Comment:
    """Fetch a single comment by id. 404 if missing, soft-deleted, or on a
    soft-deleted post."""
    return get_comment_by_id(db, comment_id)


@router.put("/comments/{comment_id}", response_model=CommentResponse)
def update_comment_endpoint(
    comment_id: int,
    payload: CommentUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
) -> Comment:
    """Update a comment's content. Only the comment's own author may do this.

    404 if the comment doesn't exist (or is soft-deleted / on a soft-deleted
    post); 403 if the caller isn't the author.
    """
    return update_own_comment(db, comment_id, user_id=current_user.id, content=payload.content)


@router.delete("/comments/{comment_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_comment_endpoint(
    comment_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
) -> None:
    """Soft-delete a comment (sets is_deleted = true; never a hard delete).

    The comment's own author can delete it. Admins can delete any comment. A
    normal user attempting to delete someone else's comment gets 403. 404 if
    the comment doesn't exist (or is already soft-deleted / on a
    soft-deleted post).
    """
    if current_user.role == UserRole.ADMIN:
        admin_delete_comment(db, comment_id)
    else:
        delete_own_comment(db, comment_id, user_id=current_user.id)