"""Admin routes (architecture placeholder).

Planned endpoints:
- GET    /api/admin/dashboard    — statistics overview
- GET    /api/admin/users        — user management
- PATCH  /api/admin/users/{id}   — update user status/role
- GET    /api/admin/posts        — post moderation
- PATCH  /api/admin/posts/{id}   — moderate post
- GET    /api/admin/reports      — report review
- PATCH  /api/admin/reports/{id} — resolve report
- GET    /api/admin/categories   — category management
- POST   /api/admin/categories   — create category
- PUT    /api/admin/categories/{id} — update category
- DELETE /api/admin/categories/{id} — delete category
"""

from fastapi import APIRouter

router = APIRouter(prefix="/admin", tags=["admin"])

# Routes will be implemented in a future phase.
