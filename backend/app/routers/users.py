"""User routes (architecture placeholder).

Planned endpoints:
- GET  /api/users/me       — private profile / My Space
- PUT  /api/users/me       — edit private profile
"""

from fastapi import APIRouter

router = APIRouter(prefix="/users", tags=["users"])

# Routes will be implemented in a future phase.
