# Backend Architecture

The FastAPI backend lives in `backend/`.

## Directory Structure

```
backend/app/
├── main.py                 # FastAPI app, CORS, router registration
│
├── core/
│   ├── config.py           # Settings (env vars, pydantic-settings)
│   ├── security.py         # Password hashing, JWT (planned)
│   └── dependencies.py     # get_db, get_current_user, require_admin (planned)
│
├── database/
│   ├── connection.py       # Engine + SessionLocal
│   └── base.py             # Declarative Base + TimestampMixin
│
├── models/                 # SQLAlchemy ORM models (planned)
├── schemas/                # Pydantic v2 schemas (planned)
├── routers/                # API route handlers (registered, empty)
├── services/               # Business logic (planned)
└── utils/
    └── anonymous_identity.py  # Anonymous handle generation (planned)
```

## Request Flow

```
HTTP Request
    │
    ▼
Router (validate input via Pydantic schema)
    │
    ▼
Dependency (JWT auth, role check, DB session)
    │
    ▼
Service (business logic)
    │
    ▼
SQLAlchemy Model (database query)
    │
    ▼
Pydantic Response Schema (strip private fields)
    │
    ▼
HTTP Response
```

## Routers (Registered, Empty)

| Router | Prefix | Tag |
|--------|--------|-----|
| `auth` | `/api/auth` | auth |
| `users` | `/api/users` | users |
| `categories` | `/api/categories` | categories |
| `posts` | `/api/posts` | posts |
| `comments` | `/api` | comments |
| `likes` | `/api` | likes |
| `reports` | `/api` | reports |
| `notifications` | `/api/notifications` | notifications |
| `admin` | `/api/admin` | admin |

The only active endpoint is `GET /api/health` (infrastructure check).

## Services (Planned)

| Service | Responsibility |
|---------|---------------|
| `auth_service` | Register, login, JWT |
| `user_service` | Profile, admin user management |
| `post_service` | CRUD, search, trending |
| `comment_service` | Comment CRUD |
| `category_service` | Category listing, admin CRUD |
| `report_service` | Submit and review reports |
| `notification_service` | Create and list notifications |
| `admin_service` | Dashboard stats, moderation |

## Security Layer (Planned)

| Module | Purpose |
|--------|---------|
| `core/security.py` | bcrypt/Argon2 hashing, JWT create/verify |
| `core/dependencies.py` | `get_current_user`, `require_admin` |
| `utils/anonymous_identity.py` | Generate unique anonymous handles |

## Database

- **Engine**: PostgreSQL via SQLAlchemy 2.0 + psycopg2
- **Migrations**: Alembic (configured, no migrations yet)
- **Config**: `DATABASE_URL` in `.env`

## Testing

```
backend/tests/
├── conftest.py       # Shared fixtures (planned)
└── test_health.py    # Health endpoint test
```

Run with: `pytest` from the `backend/` directory.
