"""Comment routes (architecture placeholder).

Planned endpoints:
- GET    /api/posts/{post_id}/comments — list comments for a post
- POST   /api/posts/{post_id}/comments — create comment
- DELETE /api/comments/{id}              — delete own comment
"""

from fastapi import APIRouter

router = APIRouter(prefix="", tags=["comments"])

# Routes will be implemented in a future phase.
