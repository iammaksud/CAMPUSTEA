"""Category endpoints: list/read are open to any authenticated user;
create/update/delete require ADMIN.
"""

from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.core.dependencies import get_current_active_user, get_current_admin_user, get_db
from app.models.category import Category
from app.schemas.category import CategoryCreate, CategoryResponse
from app.services.category_service import (
    create_category,
    delete_category,
    get_all_categories,
    get_category_by_id,
    update_category,
)

router = APIRouter()


@router.post(
    "/categories",
    response_model=CategoryResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_category_endpoint(
    payload: CategoryCreate,
    db: Session = Depends(get_db),
    _admin=Depends(get_current_admin_user),
) -> Category:
    """Create a new category. Admin only. Rejects duplicate names with 409."""
    return create_category(db, name=payload.name, description=payload.description)


@router.get("/categories", response_model=list[CategoryResponse])
def list_categories_endpoint(
    db: Session = Depends(get_db),
    _user=Depends(get_current_active_user),
) -> list[Category]:
    """List every category. Any authenticated user."""
    return get_all_categories(db)


@router.get("/categories/{category_id}", response_model=CategoryResponse)
def get_category_endpoint(
    category_id: int,
    db: Session = Depends(get_db),
    _user=Depends(get_current_active_user),
) -> Category:
    """Fetch a single category by id. Any authenticated user. 404 if missing."""
    return get_category_by_id(db, category_id)


@router.put("/categories/{category_id}", response_model=CategoryResponse)
def update_category_endpoint(
    category_id: int,
    payload: CategoryCreate,
    db: Session = Depends(get_db),
    _admin=Depends(get_current_admin_user),
) -> Category:
    """Replace a category's name/description. Admin only.

    404 if the category doesn't exist, 409 if the new name is already taken
    by a different category.
    """
    return update_category(db, category_id, name=payload.name, description=payload.description)


@router.delete("/categories/{category_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_category_endpoint(
    category_id: int,
    db: Session = Depends(get_db),
    _admin=Depends(get_current_admin_user),
) -> None:
    """Delete a category. Admin only. 404 if it doesn't exist."""
    delete_category(db, category_id)