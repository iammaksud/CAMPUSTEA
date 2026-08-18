# ☕ CampusTea — Anonymous Student Community Platform

CampusTea is a student-focused anonymous community platform where students can share campus-related thoughts, experiences, stories, opinions, and discussions without revealing their real identity.

The main idea behind CampusTea is simple:

> **The content matters more than the user's real identity.**

---

## 📌 Project Overview

Students often hesitate to share their opinions, experiences, or campus stories publicly because they may not want their real identity associated with their content.

CampusTea provides a dedicated anonymous community where students can freely participate in campus discussions.

Users can:

* Create anonymous posts
* Browse posts
* Comment on posts
* Like and unlike posts
* Report inappropriate content
* View their submitted reports
* Receive and manage notifications
* Browse content through different categories

---

## ✨ Features

### 🔐 Authentication

* User registration
* User login
* JWT-based authentication
* Secure password hashing
* Protected API endpoints
* Active/inactive user handling
* User roles:

  * User
  * Admin

### 👤 Anonymous Identity

Users have an anonymous handle instead of displaying their real identity publicly.

For example:

```text
Anonymous Owl
Anonymous Lynx
Anonymous Tiger
```

The platform internally maintains user ownership while keeping the user's real account information private from other users.

---

### 📝 Posts

Users can:

* Create posts
* Browse posts
* View individual posts
* Organize posts by category
* Soft-delete their own posts

Posts maintain their ownership internally through the authenticated user's account.

Soft deletion ensures that deleted content can be handled safely without immediately removing its database record.

---

### 💬 Comments

Users can:

* Add comments to posts
* View comments
* Soft-delete their own comments

Comments are associated with both the post and the authenticated user.

---

### ❤️ Likes

Users can:

* Like posts
* Unlike posts
* Check whether they have liked a post
* View the total number of likes

The database also contains a unique constraint to prevent the same user from liking the same post multiple times.

```text
(post_id, user_id)
        ↓
   UNIQUE
```

---

### 🚨 Reports

Users can report inappropriate posts.

Users can:

* Submit reports
* View their own reports
* View individual reports that belong to them

Administrators can:

* View all reports
* View individual reports
* Update report moderation status

Report statuses include:

```text
PENDING
REVIEWED
RESOLVED
REJECTED
```

When an administrator reviews a report, the system records:

* Review time
* Reviewing administrator

---

### 🔔 Notifications

Users can:

* View their notifications
* Mark an individual notification as read
* Mark all notifications as read

Notifications are private and can only be accessed by their owner.

Notification types include:

```text
LIKE
COMMENT
REPORT
EVENT
```

---

## 🗂️ Content Categories

CampusTea is designed around common student interests and campus culture.

Available categories include:

* Gossip
* Confession
* Expose
* Roast
* Funny Stories
* Study
* Opinions
* Questions
* Advice

---

# 🛠️ Technologies Used

| Area                    | Technology        |
| ----------------------- | ----------------- |
| Frontend                | React             |
| Backend                 | Python            |
| API Framework           | FastAPI           |
| ORM                     | SQLAlchemy        |
| Data Validation         | Pydantic          |
| Authentication          | JWT               |
| Database                | MariaDB / MySQL   |
| Database Migration      | Alembic           |
| API Documentation       | Swagger / OpenAPI |
| Version Control         | Git / GitHub      |
| Development Environment | VS Code           |

---

# 🏗️ Project Architecture

```text
CampusTea
│
├── backend/
│   │
│   ├── app/
│   │   ├── core/
│   │   │
│   │   ├── database/
│   │   │
│   │   ├── models/
│   │   │
│   │   ├── schemas/
│   │   │
│   │   ├── services/
│   │   │
│   │   ├── routers/
│   │   │
│   │   └── main.py
│   │
│   ├── alembic/
│   ├── requirements.txt
│   └── .env
│
├── frontend/
│   │
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
│
└── README.md
```

---

# 🗄️ Database Design

CampusTea uses MariaDB/MySQL as its relational database.

The main entities are:

```text
USERS
   │
   ├────────────── POSTS
   │                 │
   │                 ├──────── COMMENTS
   │                 │
   │                 ├──────── LIKES
   │                 │
   │                 └──────── REPORTS
   │
   ├────────────── COMMENTS
   │
   ├────────────── LIKES
   │
   ├────────────── REPORTS
   │
   └────────────── NOTIFICATIONS

CATEGORIES
   │
   └────────────── POSTS
```

### Main Tables

```text
users
categories
posts
comments
likes
reports
notifications
```

The database uses:

* Primary keys
* Foreign keys
* Unique constraints
* Indexes
* Cascading relationships
* Soft-delete fields
* Database-level data integrity

---

# 🔐 Security

Security and ownership isolation are important parts of CampusTea.

The backend uses:

* JWT authentication
* Password hashing
* Protected endpoints
* Role-based authorization
* User ownership validation
* Admin-only moderation operations
* Database-level constraints
* Soft deletion
* Private notification access

Sensitive information such as:

```text
password_hash
```

is never returned through public API responses.

Ownership-sensitive operations obtain the user's identity from the authenticated JWT rather than trusting a `user_id` supplied by the client.

For example:

```text
Client
   │
   │ JWT
   ▼
FastAPI
   │
   ▼
Authenticated User
   │
   ▼
User ID obtained from JWT
   │
   ▼
Database operation
```

This prevents users from simply submitting another user's ID to perform actions on their behalf.

---

# 🚀 Installation & Setup

## Prerequisites

Install the following before running CampusTea:

* Python 3.11+
* Node.js
* npm
* MariaDB or MySQL
* Git

---

# ⚙️ Backend Setup

### 1. Clone the repository

```bash
git clone <YOUR_REPOSITORY_URL>
```

Go into the project:

```bash
cd CampusTea
```

---

### 2. Open the backend

```bash
cd backend
```

---

### 3. Create a Python virtual environment

Windows:

```bash
python -m venv .venv
```

---

### 4. Activate the virtual environment

Windows:

```bash
.venv\Scripts\activate
```

---

### 5. Install backend dependencies

```bash
pip install -r requirements.txt
```

---

### 6. Configure the database

Create a MariaDB/MySQL database for CampusTea.

Example:

```sql
CREATE DATABASE campustea;
```

---

### 7. Configure environment variables

Create a `.env` file inside the `backend` directory.

Example:

```env
DATABASE_URL=mysql+pymysql://USERNAME:PASSWORD@localhost:3306/campustea

SECRET_KEY=your-secret-key

ALGORITHM=HS256

ACCESS_TOKEN_EXPIRE_MINUTES=30
```

Use your own database credentials and secret key.

---

### 8. Run database migrations

From the `backend` directory:

```bash
alembic upgrade head
```

---

### 9. Start the backend server

```bash
uvicorn app.main:app --reload
```

The backend will run at:

```text
http://127.0.0.1:8000
```

---

# 🎨 Frontend Setup

Open another terminal.

Go to the frontend:

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

The frontend will normally run at:

```text
http://localhost:5173
```

---

# 📖 API Documentation

CampusTea uses FastAPI's automatic API documentation.

After starting the backend, open:

```text
http://127.0.0.1:8000/docs
```

Swagger UI allows developers to:

* View available endpoints
* View request parameters
* View response schemas
* Authenticate with JWT
* Test API endpoints

OpenAPI specification:

```text
http://127.0.0.1:8000/openapi.json
```

---

# 🔌 Backend API Modules

The backend is organized into separate API modules.

```text
Authentication
│
├── Register
├── Login
└── Current User

Users
│
└── Current User Profile

Categories
│
└── Category Management

Posts
│
├── Create
├── Read
└── Soft Delete

Comments
│
├── Create
├── Read
└── Soft Delete

Likes
│
├── Like
├── Unlike
├── Like Count
└── Liked Status

Reports
│
├── Create Report
├── My Reports
├── View Report
├── Admin Report List
└── Admin Review

Notifications
│
├── List Notifications
├── Mark Notification Read
└── Mark All Notifications Read
```

---

# 🧪 Testing & Verification

The backend has been tested against important functional and security scenarios.

Testing includes:

* User registration
* User login
* JWT authentication
* Protected endpoints
* User ownership
* Post creation
* Comment creation
* Like and unlike functionality
* Duplicate like prevention
* Report creation
* Report ownership
* Admin report management
* Report status updates
* Notification ownership
* Marking notifications as read
* Soft-deleted post behavior
* Invalid request validation
* Unauthorized access
* Sensitive data protection

The API was also checked through Swagger/OpenAPI during development.

---

# 📊 Database Screenshots

The database contains the following main tables:

```text
users
posts
categories
comments
likes
reports
notifications
```

These tables demonstrate the relationships between users, posts, categories, interactions, moderation reports, and notifications.

---

# 🔮 Future Work

Although CampusTea provides the core functionality of an anonymous student community platform, several improvements can be added in future versions.

## 👨‍💼 Admin

* Dedicated admin dashboard
* User management
* Better content moderation
* Report management interface

## 🔎 Discovery

* Search functionality
* Trending posts
* Improved category discovery
* Popular content

## 🔔 Notifications

* Automatic notifications for likes
* Automatic notifications for comments
* Automatic moderation notifications

## 🛡️ Security

* Rate limiting
* Abuse prevention
* Advanced moderation
* Spam detection

## 🌐 Deployment

* HTTPS
* Production database
* Monitoring
* Logging
* Automated database backups

## 📱 Frontend

* Better mobile responsiveness
* Improved accessibility
* Improved UI/UX
* Better navigation

## 🧪 Testing

* More unit tests
* More integration tests
* Automated testing pipeline
* Continuous integration

---

# 🎯 Project Goal

CampusTea was designed to create a comfortable digital environment where students can share their thoughts and experiences without needing to reveal their real identity.

The platform focuses on:

```text
Anonymous Identity
       +
Student Community
       +
Campus Discussions
       +
Safe Interaction
       =
CampusTea
```

The core idea is:

> **The content matters more than the user's real identity.**

---

# 👨‍💻 Author

**Maksudul Islam**

**Student ID:** 241-35-537

**Section:** 42 H1

---

# 🎓 Academic Project

CampusTea is an academic full-stack software project demonstrating the development of an anonymous student community platform using modern web technologies, REST APIs, relational database design, authentication, authorization, and frontend-backend integration.

---

## 📄 License

This project was developed for academic and educational purposes.
