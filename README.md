# CampusTea

Anonymous university student community platform.

Students can post, comment, like, and report content anonymously. Administrators manage users, content, and moderation.

## Project Structure

```
CampusTea/
├── src/              # React frontend (Vite, at project root)
├── public/           # Static assets
├── backend/          # FastAPI backend
├── docs/             # Architecture & API documentation
├── package.json      # Frontend dependencies
└── README.md
```

## Tech Stack

| Layer    | Technologies |
|----------|-------------|
| Frontend | React, Vite, Bootstrap 5, React Router, Axios |
| Backend  | Python, FastAPI, PostgreSQL, SQLAlchemy 2.0, Alembic, Pydantic v2, JWT |
| Testing  | Pytest, FastAPI TestClient, React Testing Library |

## Getting Started

### Frontend

```bash
npm install
npm run dev
```

Runs at http://localhost:5173

### Backend

```bash
cd backend
python -m venv .venv
.\.venv\Scripts\pip install -r requirements.txt
copy .env.example .env
.\.venv\Scripts\uvicorn app.main:app --reload
```

Runs at http://localhost:8000

Health check: http://localhost:8000/api/health

## Documentation

See the `docs/` folder for detailed architecture:

- [Overall Architecture](docs/architecture/overview.md)
- [Frontend Architecture](docs/architecture/frontend.md)
- [Backend Architecture](docs/architecture/backend.md)
- [Database Entities](docs/database/entities.md)
- [API Endpoints](docs/api/endpoints.md)

## Current Status

**Architecture phase complete.** The full folder skeleton is in place. Business features (auth, CRUD, database tables, API integration) are not yet implemented. The frontend currently uses mock data in `src/data/`.
