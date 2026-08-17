"""Category business logic: create, list, read, update, and delete categories."""

from fastapi import HTTPException, status
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.models.category import Category


def _get_category_or_404(db: Session, category_id: int) -> Category:
    category = db.get(Category, category_id)
    if category is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Category not found",
        )
    return category


def _check_name_available(db: Session, name: str, *, exclude_category_id: int | None = None) -> None:
    query = db.query(Category).filter(Category.name == name)
    if exclude_category_id is not None:
        query = query.filter(Category.id != exclude_category_id)
    if query.first() is not None:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="A category with this name already exists",
        )


def create_category(db: Session, name: str, description: str | None) -> Category:
    """Create a new category. Raises 409 if the name is already taken."""
    _check_name_available(db, name)

    category = Category(name=name, description=description)
    db.add(category)
    db.commit()
    db.refresh(category)
    return category


def get_all_categories(db: Session) -> list[Category]:
    """Return every category, ordered alphabetically by name."""
    return db.query(Category).order_by(Category.name).all()


def get_category_by_id(db: Session, category_id: int) -> Category:
    """Return a single category. Raises 404 if it doesn't exist."""
    return _get_category_or_404(db, category_id)


def update_category(db: Session, category_id: int, name: str, description: str | None) -> Category:
    """Replace a category's name/description.

    Raises 404 if the category doesn't exist, or 409 if another category
    already uses the requested name.
    """
    category = _get_category_or_404(db, category_id)
    _check_name_available(db, name, exclude_category_id=category_id)

    category.name = name
    category.description = description
    db.commit()
    db.refresh(category)
    return category


def delete_category(db: Session, category_id: int) -> None:
    """Delete a category.

    Raises 404 if it doesn't exist. Raises 409 if the category still has
    posts referencing it (posts.category_id -> categories.id is ON DELETE
    RESTRICT at the database level) — not reachable yet since posts aren't
    implemented, but handled defensively rather than surfacing a raw 500.
    """
    category = _get_category_or_404(db, category_id)
    db.delete(category)
    try:
        db.commit()
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Cannot delete a category that still has posts",
        )