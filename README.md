# ☕ CampusTea — Anonymous Student Community Platform

CampusTea is a student-focused anonymous community platform designed for sharing campus-related thoughts, experiences, stories, opinions, and discussions without revealing users' real identities.

The platform focuses on creating a fun, simple, and student-centered environment where **the content matters more than the user's real identity.**

---

## 📌 Project Overview

Students often hesitate to share their opinions, experiences, or campus stories publicly because they may not want their real identity associated with the content.

CampusTea provides a dedicated anonymous community where students can:

- Create anonymous posts
- Browse campus discussions
- Comment on posts
- Like and unlike posts
- Report inappropriate content
- View and manage their notifications
- Browse posts by categories
- Maintain an anonymous identity

The platform is designed around common student interests and campus culture.

---

## ✨ Features

### 👤 Authentication & Users
- User registration and login
- JWT-based authentication
- Secure password hashing
- User roles
  - User
  - Admin
- Anonymous handles
- Protected API endpoints

### 📝 Posts
- Create posts anonymously
- Browse posts
- Categorize posts
- View individual posts
- Soft-delete posts
- Track post ownership internally without exposing real identity

### 💬 Comments
- Add comments to posts
- View comments
- Soft-delete comments
- Comments are associated with the authenticated user

### ❤️ Likes
- Like posts
- Unlike posts
- Check whether the current user liked a post
- View like counts
- Database-level protection against duplicate likes

### 🚨 Reports
- Report inappropriate posts
- View personal reports
- Admins can view all reports
- Admins can update report status
- Automatically records:
  - Review time
  - Reviewing admin
- Prevents users from spoofing reporter identity

### 🔔 Notifications
- View personal notifications
- Mark individual notifications as read
- Mark all notifications as read
- Notifications are private to the authenticated user

### 🗂️ Categories

CampusTea supports categories such as:

- Gossip
- Confession
- Expose
- Roast
- Funny Stories
- Study
- Opinions
- Questions
- Advice

---

## 🛠️ Technologies

| Area | Technology |
|---|---|
| Frontend | React |
| Backend | Python, FastAPI |
| ORM | SQLAlchemy |
| Validation | Pydantic |
| Authentication | JWT |
| Database | MariaDB / MySQL |
| Migrations | Alembic |
| API Documentation | Swagger / OpenAPI |
| Development | VS Code |
| Version Control | Git / GitHub |

---

## 🏗️ Project Architecture

```text
CampusTea
│
├── frontend/
│   └── React + Vite
│
├── backend/
│   ├── app/
│   │   ├── core/
│   │   ├── database/
│   │   ├── models/
│   │   ├── schemas/
│   │   ├── services/
│   │   ├── routers/
│   │   └── main.py
│   │
│   ├── alembic/
│   └── requirements.txt
│
└── README.md
````

---

## 🗄️ Database

The main database entities are:

```text
USERS
   │
   ├──────── POSTS ──────── CATEGORIES
   │            │
   │            ├──────── COMMENTS
   │            │
   │            ├──────── LIKES
   │            │
   │            └──────── REPORTS
   │
   └──────── NOTIFICATIONS
```

### Main Tables

* `users`
* `categories`
* `posts`
* `comments`
* `likes`
* `reports`
* `notifications`

The database uses foreign keys, indexes, unique constraints, and soft-delete mechanisms where appropriate.

---

## 🔐 Security

CampusTea uses several security measures:

* JWT authentication
* Password hashing
* Protected API endpoints
* User ownership validation
* Admin-only moderation endpoints
* No `user_id` supplied by clients for ownership-sensitive operations
* Database-level unique constraint for likes
* Soft deletion for posts and comments
* Private notification access
* Sensitive fields such as `password_hash` are never returned through API responses

For example, when a user creates a post:

```text
Request
   │
   ▼
JWT Token
   │
   ▼
Authenticated User
   │
   ▼
Backend obtains user ID
   │
   ▼
Post is created for that user
```

The client cannot simply provide another user's ID to create content on their behalf.

---

## 🚀 Getting Started

### Prerequisites

Make sure you have installed:

* Python 3.11+
* Node.js
* npm
* MariaDB / MySQL
* Git

---

# Backend Setup

### 1. Clone the repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd CampusTea
```

### 2. Go to the backend

```bash
cd backend
```

### 3. Create a virtual environment

Windows:

```bash
python -m venv .venv
```

### 4. Activate the virtual environment

```bash
.venv\Scripts\activate
```

### 5. Install dependencies

```bash
pip install -r requirements.txt
```

### 6. Configure environment variables

Create a `.env` file inside `backend/`.

Example:

```env
DATABASE_URL=mysql+pymysql://USERNAME:PASSWORD@localhost:3306/campustea

SECRET_KEY=your-secret-key

ALGORITHM=HS256

ACCESS_TOKEN_EXPIRE_MINUTES=30
```

Use your own database username, password, and secret key.

### 7. Run database migrations

```bash
alembic upgrade head
```

### 8. Start FastAPI

```bash
uvicorn app.main:app --reload
```

Backend will be available at:

```text
http://127.0.0.1:8000
```

Swagger API documentation:

```text
http://127.0.0.1:8000/docs
```

---

# Frontend Setup

Open another terminal.

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

---

## 🔌 API Modules

The backend provides API functionality for:

```text
Authentication
    ├── Register
    ├── Login
    └── Current User

Users
    └── Current User Profile

Categories
    └── Category Management

Posts
    ├── Create
    ├── Read
    └── Soft Delete

Comments
    ├── Create
    ├── Read
    └── Soft Delete

Likes
    ├── Like
    ├── Unlike
    ├── Count
    └── Liked Status

Reports
    ├── Create
    ├── My Reports
    ├── View Report
    ├── Admin List
    └── Admin Review

Notifications
    ├── List
    ├── Mark Read
    └── Mark All Read
```

---

## 📖 API Documentation

Once the backend is running, FastAPI automatically provides interactive API documentation.

### Swagger UI

```text
http://127.0.0.1:8000/docs
```

### OpenAPI Schema

```text
http://127.0.0.1:8000/openapi.json
```

Swagger can be used to test authentication and API endpoints during development.

---

## 🧪 Testing

The backend has been tested for important scenarios including:

* Authentication
* Unauthorized access
* User ownership
* Post creation
* Comment creation
* Like/unlike operations
* Duplicate like prevention
* Report creation
* Admin report moderation
* Notification ownership
* Soft-deleted post behavior
* Invalid request validation
* Sensitive data protection

Special attention was given to preventing users from spoofing another user's identity through request bodies.

---

## 🔮 Future Work

The following features can be added in future versions:

### Admin

* Dedicated admin dashboard
* User management
* Content moderation interface

### Discovery

* Search
* Trending posts
* Better category discovery

### Notifications

* Automatic notifications for likes
* Automatic notifications for comments
* Automatic moderation notifications

### Security

* Rate limiting
* Abuse prevention
* Better moderation tools

### Deployment

* HTTPS
* Production database
* Monitoring
* Logging
* Automated backups

### Frontend

* Better mobile responsiveness
* Accessibility improvements
* Improved UI/UX

---

## 🎯 Project Goal

The main goal of CampusTea is to provide students with a space where they can participate in campus discussions without worrying about exposing their real identity.

> **The content matters more than the user's real identity.**

---

## 👨‍💻 Author

**Maksudul Islam**

Student ID: **241-35-537**

Section: **42 H1**

---

## 📄 Academic Project

CampusTea was developed as an academic software project to demonstrate the design and implementation of a full-stack anonymous student community platform using modern web technologies.

````

### One important thing before pushing

Since you're putting this on GitHub, **do not put your `.env` file, database password, JWT secret, `.venv`, or `node_modules` in the repository.**

Your `.gitignore` should include at least:

```gitignore
# Python
.venv/
__pycache__/
*.pyc

# Environment
.env

# Node
node_modules/
dist/

# IDE
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db
````

Also replace:

```text
https://github.com/iammaksud/CAMPUSTEA/
```

