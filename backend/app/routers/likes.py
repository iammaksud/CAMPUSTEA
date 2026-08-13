"""Like routes (architecture placeholder).

Planned endpoints:
- POST   /api/posts/{post_id}/like — toggle like (one per user per post)
"""

from fastapi import APIRouter

router = APIRouter(prefix="", tags=["likes"])

# Routes will be implemented in a future phase.
