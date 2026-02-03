# Task Manager API

> A production-ready RESTful API for task management with JWT-based authentication — built with Node.js, Express, and MongoDB.

A secure, multi-user task management backend. Each user registers, authenticates, and manages a private set of tasks — no cross-user data leakage, no unauthenticated access.

---

## Live Demo

| Resource | Link |
|---|---|
| GitHub Repository | [github.com/KoderKalash/backend-breakdown](https://github.com/KoderKalash/backend-breakdown) |
| API Base URL | *(Add your deployed URL here — e.g. Render / Railway)* |

---

## Architecture Overview

```
┌─────────────┐     ┌──────────────┐     ┌─────────────────┐
│   Client    │────▶│  Express API │────▶│   MongoDB Atlas  │
│ (Postman /  │     │              │     │                  │
│  Frontend)  │◀────│  Auth + CRUD │◀────│  Users + Tasks   │
└─────────────┘     └──────────────┘     └─────────────────┘
                           │
                    ┌──────▼──────┐
                    │  JWT Tokens  │
                    │  (bcryptjs)  │
                    └─────────────┘
```

**Request Flow:**
1. User registers or logs in → server returns a signed JWT
2. Client attaches JWT in the `Authorization` header on every subsequent request
3. Auth middleware validates the token before any route handler runs
4. Task routes filter data by the authenticated user's ID — users never see each other's data

---

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MongoDB (Mongoose ODM) |
| Auth | JSON Web Tokens (jsonwebtoken) |
| Security | bcryptjs (password hashing) |
| Config | dotenv |

---

## Project Structure

```
crud-api/
├── models/
│   ├── User.js          # Mongoose schema — email, hashed password
│   └── Task.js          # Mongoose schema — title, description, owner ref
├── middleware/
│   └── auth.js          # JWT verification middleware
├── routes/
│   ├── auth.js          # POST /register, POST /login
│   └── tasks.js         # CRUD endpoints (protected)
├── server.js            # Express app setup, DB connection, route mounting
├── .env.example         # Environment variable template
├── package.json
└── README.md
```

---

## API Endpoints

### Authentication

| Method | Endpoint | Auth Required | Description |
|---|---|---|---|
| `POST` | `/api/auth/register` | No | Create a new user account |
| `POST` | `/api/auth/login` | No | Authenticate and receive a JWT |

### Tasks

| Method | Endpoint | Auth Required | Description |
|---|---|---|---|
| `POST` | `/api/tasks` | ✓ | Create a new task |
| `GET` | `/api/tasks` | ✓ | Retrieve all tasks for the authenticated user |
| `GET` | `/api/tasks/:id` | ✓ | Retrieve a single task by ID |
| `PUT` | `/api/tasks/:id` | ✓ | Update an existing task |
| `DELETE` | `/api/tasks/:id` | ✓ | Delete a task |

---

## Request / Response Examples

### Register

```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "dev@example.com",
  "password": "securepassword123"
}
```

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Login

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "dev@example.com",
  "password": "securepassword123"
}
```

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Create Task (protected)

```http
POST /api/tasks
Content-Type: application/json
Authorization: Bearer <your_token>

{
  "title": "Implement rate limiter",
  "description": "Add Redis-based rate limiting to all public endpoints"
}
```

```json
{
  "_id": "65a1b2c3d4e5f6a7b8c9d0e1",
  "title": "Implement rate limiter",
  "description": "Add Redis-based rate limiting to all public endpoints",
  "user": "65a1b2c3d4e5f6a7b8c9d0e0",
  "createdAt": "2026-02-03T18:30:00.000Z"
}
```

### Get All Tasks (protected)

```http
GET /api/tasks
Authorization: Bearer <your_token>
```

```json
[
  {
    "_id": "65a1b2c3d4e5f6a7b8c9d0e1",
    "title": "Implement rate limiter",
    "description": "Add Redis-based rate limiting to all public endpoints",
    "user": "65a1b2c3d4e5f6a7b8c9d0e0",
    "createdAt": "2026-02-03T18:30:00.000Z"
  }
]
```

---

## Setup & Running Locally

### Prerequisites

- Node.js `v18+`
- npm `v9+`
- MongoDB Atlas account (free tier is sufficient)

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/KoderKalash/backend-breakdown.git
cd backend-breakdown/crud-api

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env
# Edit .env — add your MongoDB URI and JWT secret

# 4. Start the server
npm start

# For development (auto-restart on file changes)
npm run dev
```

### Environment Variables

Create a `.env` file in the `crud-api/` directory:

```env
PORT=3000
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/<dbname>
JWT_SECRET=your_jwt_secret_key_here
```

> Never commit `.env` to version control. Only `.env.example` (with placeholder values) should be in the repo.

---

## Security Notes

- Passwords are hashed with **bcryptjs** before storage — raw passwords never touch the database
- JWTs are signed with a secret key stored in an environment variable
- The auth middleware runs **before** any task route handler — unauthenticated requests are rejected at the middleware layer
- Task queries are scoped to `req.user._id` — a user cannot read, update, or delete another user's tasks regardless of knowing the task ID

---
