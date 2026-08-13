# CampusTea Backend

FastAPI backend for the CampusTea anonymous student community platform.

## Structure

```
backend/
├── app/
│   ├── core/           # Config, security, dependencies
│   ├── database/       # Connection, SQLAlchemy base
│   ├── models/         # Database entity models
│   ├── schemas/        # Pydantic request/response schemas
│   ├── routers/        # API route handlers
│   ├── services/       # Business logic layer
│   ├── utils/          # Helpers (anonymous identity, etc.)
│   └── main.py         # FastAPI application entry point
├── alembic/            # Database migrations
├── tests/              # Pytest test suite
├── requirements.txt
└── .env.example
```

## Setup

```bash
python -m venv .venv
.\.venv\Scripts\pip install -r requirements.txt
copy .env.example .env
```

Edit `.env` with your PostgreSQL connection string.

## Run

```bash
.\.venv\Scripts\uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

## Test

```bash
.\.venv\Scripts\pytest
```

## Current Status

Architecture skeleton only. Routers are registered but contain no business routes yet. Database models and migrations will be added in the next phase.

See [docs/](../docs/) for full architecture documentation.
