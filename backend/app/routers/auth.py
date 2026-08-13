"""Authentication routes (architecture placeholder).

Planned endpoints:
- POST /api/auth/register  — create account with anonymous handle
- POST /api/auth/login     — authenticate and return JWT
- GET  /api/auth/me        — return current authenticated user (private fields)
"""

from fastapi import APIRouter

router = APIRouter(prefix="/auth", tags=["auth"])

# Routes will be implemented in a future phase.
