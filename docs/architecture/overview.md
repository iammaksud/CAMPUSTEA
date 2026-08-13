# Overall Architecture

CampusTea is a full-stack anonymous university community platform.

## High-Level Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                        Browser (React)                       │
│  Pages → Components → Hooks → Context → Services (Axios)    │
└──────────────────────────┬──────────────────────────────────┘
                           │ HTTP / JSON
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                     FastAPI Backend                          │
│  Routers → Services → SQLAlchemy Models → PostgreSQL       │
└─────────────────────────────────────────────────────────────┘
```

## Layer Responsibilities

| Layer | Location | Responsibility |
|-------|----------|---------------|
| **Pages** | `src/pages/` | Route-level screens |
| **Components** | `src/components/` | Reusable UI pieces |
| **Layouts** | `src/layouts/` | Page shells (nav, sidebar) |
| **Services** | `src/services/` | HTTP calls to the API |
| **Hooks** | `src/hooks/` | Reusable stateful logic |
| **Context** | `src/context/` | Global app state (auth) |
| **Mock Data** | `src/data/` | Temporary data until API is wired |
| **Routers** | `backend/app/routers/` | HTTP endpoints, input validation |
| **Services** | `backend/app/services/` | Business rules, orchestration |
| **Models** | `backend/app/models/` | Database tables & relationships |
| **Schemas** | `backend/app/schemas/` | Request/response validation |

## Key Design Principles

1. **Anonymity first** — public API responses never expose email, student ID, or real names.
2. **Separation of concerns** — routers are thin; business logic lives in services.
3. **Role-based access** — student vs admin permissions enforced at the dependency layer.
4. **Incremental delivery** — mock data stays until each feature is API-ready.

## Frontend Location

The React frontend lives at the **project root** (`src/`, `public/`, `vite.config.js`), not in a separate `frontend/` folder. This preserves the existing working setup.

## Related Docs

- [Frontend Architecture](frontend.md)
- [Backend Architecture](backend.md)
- [Database Entities](../database/entities.md)
- [API Endpoints](../api/endpoints.md)
