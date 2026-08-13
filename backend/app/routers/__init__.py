"""API route handlers."""

from app.routers import (
    admin,
    auth,
    categories,
    comments,
    likes,
    notifications,
    posts,
    reports,
    users,
)

__all__ = [
    "admin",
    "auth",
    "categories",
    "comments",
    "likes",
    "notifications",
    "posts",
    "reports",
    "users",
]
