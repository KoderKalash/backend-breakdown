# backend-breakdown

A collection of production-ready backend APIs built with Node.js, Express, and MongoDB. Each project in this repository is a standalone, fully-functional backend application — not a tutorial exercise, not a half-finished project. Every one ships with authentication, proper data isolation, and documentation.

This repo is structured as a monorepo intentionally. Rather than scattering projects across dozens of disconnected repositories, everything lives here — making it easier to see progression, compare approaches across projects, and maintain a single source of truth for backend work.

---

## Why This Repo Exists

Most developer portfolios are a graveyard of cloned tutorials and abandoned side projects. This isn't that.

Every project here was built from scratch — no AI-generated code, no copy-pasted boilerplate. The goal is simple: build real, working backend systems, understand them deeply enough to explain every line, and ship them properly. Each new project deliberately introduces a layer of complexity that the previous one didn't have. That's the breakdown — breaking down backend development, piece by piece, until it's second nature.

---

## Projects

| # | Project | Description | Tech | Status | Live |
|---|---------|-------------|------|--------|------|
| 1 | [crud-api](./crud-api) | Task Manager — full CRUD with JWT auth, per-user data isolation | Node.js, Express, MongoDB, JWT, bcryptjs | ✅ Complete | *(deploy link)* |
| 2 | blog-api | Blog platform — posts, comments, likes, relationships | Node.js, Express, MongoDB, JWT | 🔜 Next | — |
| 3 | ecommerce-api | E-commerce backend — products, cart, orders, role-based access | Node.js, Express, MongoDB, Cloudinary | 🔜 Planned | — |
| 4 | realtime-chat | Real-time chat — WebSockets, rooms, message history | Node.js, Express, MongoDB, Socket.io | 🔜 Planned | — |
| 5 | *(TBD)* | Microservices project — split architecture, inter-service communication | Node.js, Docker, RabbitMQ/Redis | 🔜 Future | — |

---

## What Each Project Adds

This isn't random. Each project builds on the last one on purpose:

**crud-api** — The foundation. User auth, JWT middleware, CRUD operations, data scoping. Proves the basics work end-to-end.

**blog-api** — Introduces relational data. Users own posts. Posts have comments. Comments have authors. This is where Mongoose relationships, nested queries, and multi-model logic come in. Also adds input validation and pagination.

**ecommerce-api** — Raises the stakes. Role-based access control (admin vs. user). File uploads to cloud storage. Inventory logic. Order state management. This is closer to what a real startup backend looks like.

**realtime-chat** — Moves beyond request-response. WebSockets, persistent connections, room-based messaging. A fundamentally different pattern from REST APIs.

**Microservices project** — Breaks a single application into independently deployable services. Inter-service communication, Docker containers, message queues. This is where backend engineering starts to look like systems engineering.

---

## Tech Stack

| Category | Technologies |
|---|---|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MongoDB (Mongoose) |
| Auth | JSON Web Tokens |
| Security | bcryptjs |
| Real-time | Socket.io *(upcoming)* |
| Cloud Storage | Cloudinary *(upcoming)* |
| Caching | Redis *(upcoming)* |
| Containers | Docker *(upcoming)* |
| Message Queues | RabbitMQ / Bull *(upcoming)* |

---

## How to Run Any Project

Each project is self-contained. Navigate into the project folder and follow its own `README.md`:

```bash
cd <project-name>
npm install
cp .env.example .env   # add your own values
npm run dev
```

Every project uses environment variables for sensitive config. Nothing is hardcoded. Nothing leaks.

---

## Roadmap

```
February 2026
  ├── ✅ crud-api          — Auth + CRUD foundation
  └── 🔜 blog-api          — Relationships + validation

March 2026
  ├── 🔜 ecommerce-api     — Roles + file uploads + order logic
  └── 🔜 Add Redis caching to blog-api

April 2026
  ├── 🔜 realtime-chat     — WebSockets + Socket.io
  └── 🔜 Add unit tests (Jest + Supertest) across all projects

May 2026
  └── 🔜 Microservices project — Docker + message queues + service mesh
```

---

## What's Consistent Across Every Project

- **No `.env` secrets committed** — `.env.example` only
- **Clean project structure** — models, routes, middleware separated
- **Error handling** — not an afterthought
- **Per-user data isolation** — users cannot access each other's data
- **Deployed and live** — not just sitting on a local machine
- **Documented** — every project has its own README with setup, endpoints, and examples

---

## Contact

[GitHub](https://github.com/KoderKalash) · [LinkedIn](https://linkedin.com/in/kalash-sharma) · [Twitter](https://twitter.com/kaiser_kalash)