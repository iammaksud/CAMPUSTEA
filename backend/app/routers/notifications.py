"""Notification routes (architecture placeholder).

Planned endpoints:
- GET  /api/notifications       — list user notifications
- PUT  /api/notifications/{id}  — mark as read
"""

from fastapi import APIRouter

router = APIRouter(prefix="/notifications", tags=["notifications"])

# Routes will be implemented in a future phase.
