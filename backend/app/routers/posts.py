"""Post routes (architecture placeholder).

Planned endpoints:
- GET    /api/posts              — list, search, filter, trending
- POST   /api/posts              — create post
- GET    /api/posts/{id}         — post detail
- PUT    /api/posts/{id}         — update own post
- DELETE /api/posts/{id}         — delete own post
"""

from fastapi import APIRouter

router = APIRouter(prefix="/posts", tags=["posts"])

# Routes will be implemented in a future phase.
