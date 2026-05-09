# Secure Full-Stack Platform

This is a case management application I built for security analysts conducting audits. Each phase of this project adds a new production concern on top of a working system. I started with auth and CRUD first, then containerization, CI/CD, observability, Kubernetes, and security hardening.

Currently shipped: phases A and B (full-stack web app with JWT auth, all services 
containerized via Docker). Roadmap below.

## Stack

- **Frontend:** React + TypeScript + Vite
- **Backend:** Node.js + Express + TypeScript  
- **Database:** PostgreSQL 15
- **Infra:** Docker + docker-compose, nginx

## What's working today

- JWT-based authentication with bcrypt password hashing (cost 10)
- Generic error messages to prevent user enumeration
- Authenticated routes guarded by JWT middleware
- Type-augmented Express `Request` object (`req.user` typed across the codebase)
- Frontend auth context with in-memory token storage (no localStorage; XSS-resistant)
- Protected client-side routes that redirect unauthenticated users
- React Router with nginx fallback to `index.html` for client-side routes
- Multi-stage Docker builds (build vs runtime image separation)
- Container orchestration via docker-compose with healthchecks
- Database schema auto-initialized on first run via `init.sql`
- Fail-fast backend startup (exits if DB unreachable)

## Getting started

Requirements: Docker Desktop. No Node, no Postgres install needed.

```bash
git clone 
cd secure-fullstack-platform

# Set up secrets
cp .env.example .env
# Open .env and replace JWT_SECRET with a real value
# (PowerShell: [Convert]::ToBase64String((1..64 | %{ Get-Random -Max 256 })))

docker-compose up --build
```

Then open http://localhost:5173.

The `users` and `cases` tables are created automatically on first start. Register a user via the API:

```bash
curl -X POST http://localhost:8000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"yourname","password":"yourpassword"}'
```

Then log in via the UI.

## Architecture
┌─────────────────┐         ┌─────────────────┐         ┌─────────────────┐
│   Frontend      │ HTTPS   │    Backend      │ Internal│    Postgres     │
│   nginx + React │ ──────► │  Express + JWT  │ ──────► │   15 + init.sql │
│   Port 5173     │         │   Port 8000     │  network│   Port 5432     │
└─────────────────┘         └─────────────────┘         └─────────────────┘

All three services live on a shared docker-compose network. The backend reaches Postgres at `db:5432` (service name); the frontend reaches the backend at `localhost:8000` (browser-side, same as host).

## Useful commands

```bash
docker-compose up --build       # start everything (rebuilds images)
docker-compose up -d            # start in background
docker-compose down             # stop
docker-compose down -v          # stop and wipe DB data
docker-compose logs -f backend  # tail backend logs
```

## Project roadmap

- [x] Phase A — full-stack web app with auth
- [x] Phase B — containerization (Docker + docker-compose)
- [ ] Phase C — CI/CD pipeline (GitHub Actions, secret scanning)
- [ ] Phase D — Redis caching + Prometheus/Grafana observability
- [ ] Phase E — Kubernetes deployment with Helm
- [ ] Phase F — Security hardening (SAST, DAST, SBOM, threat model)
- [ ] Phase G — Java Spring Boot analytics microservice

