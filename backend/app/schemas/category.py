"""Category schemas."""

from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict, Field


class CategoryCreate(BaseModel):
    """Request body for creating (POST) or replacing (PUT) a category — admin only."""

    name: str = Field(min_length=2, max_length=100)
    description: Optional[str] = Field(default=None, max_length=2000)


class CategoryResponse(BaseModel):
    """Safe representation of a category — matches the Category model exactly,
    no unnecessary fields exposed."""

    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    description: Optional[str] = None
    created_at: datetime