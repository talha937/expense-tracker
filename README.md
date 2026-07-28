# Expense Tracker

[![CI](https://github.com/talha937/expense-tracker/actions/workflows/ci.yml/badge.svg)](https://github.com/talha937/expense-tracker/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
![Version](https://img.shields.io/badge/version-1.0.0-blue)

A full-stack personal finance tracker that helps students, early-career professionals, and anyone budget-conscious log daily spending, monitor category-level trends, and stay inside monthly limits.

## Why this project matters

Money habits are easier to improve when spending is visible in real time. This project turns raw expense entries into clear summaries and budget signals, which makes better financial decisions faster and less stressful.

## Features

### Current
- Email/password authentication (signup + login)
- Add, edit, and delete expenses
- Category-wise expense tracking
- Expense summary dashboard
- Monthly budget setup and budget-vs-spending tracking
- FastAPI backend with SQLite fallback and optional MySQL support

### Aspirational (roadmap)
- CSV export/import
- Recurring expense automation
- Multi-currency support
- Notifications when budgets are close to limits

## Architecture & Tech Stack

- **Frontend (JavaScript, HTML, CSS):** React + Vite SPA in `/frontend` for authentication, dashboard, budgets, and interactive UI components.
- **Backend (Python):** FastAPI app in `/backend` exposing REST endpoints for auth, expenses, and budgets.
- **Database layer (Python/SQLAlchemy):** ORM models + CRUD services. Uses SQLite locally by default, and switches to MySQL when DB environment variables are set.
- **API tooling:** Postman collection in `/postman` for quick endpoint testing.

## Project Structure

```text
expense-tracker/
├── backend/
│   ├── main.py
│   ├── database.py
│   ├── models.py
│   ├── schemas.py
│   ├── crud.py
│   ├── auth.py
│   ├── requirements.txt
│   └── routers/
├── frontend/
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   └── src/
├── postman/
├── .github/
│   ├── workflows/
│   ├── ISSUE_TEMPLATE/
│   └── pull_request_template.md
└── README.md
```

## Prerequisites

- Node.js 20+
- npm 10+
- Python 3.11+
- pip

## Setup & Run

### 1) Clone

```bash
git clone https://github.com/talha937/expense-tracker.git
cd expense-tracker
```

### 2) Backend setup

```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\\Scripts\\activate
pip install -r requirements.txt
cp .env.example .env
uvicorn main:app --reload
```

Backend runs at `http://127.0.0.1:8000`.

### 3) Frontend setup

In a new terminal:

```bash
cd frontend
npm ci
cp .env.example .env
npm run dev
```

Frontend runs at `http://localhost:5173`.

## Usage

### Example flow
1. Sign up with email/password.
2. Log in and create expenses (e.g., food, transportation, utilities).
3. Review totals and category breakdown on Dashboard.
4. Set monthly budget limits per category from **Budgets** page.

### API examples

```bash
# Health check
curl http://127.0.0.1:8000/

# Signup
curl -X POST http://127.0.0.1:8000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@example.com","password":"password123"}'
```

### Screenshots

- Existing UI preview asset: `frontend/src/assets/hero.png`
- `docs/screenshots/dashboard.png` *(placeholder - add dashboard capture)*
- `docs/screenshots/budgets.png` *(placeholder - add budgets capture)*

## API / CLI Docs

- **REST API:** Available via FastAPI routes in `/backend/routers`.
- **CLI:** N/A (this project currently exposes a web UI + HTTP API only).

## Testing & Linting

### Frontend

```bash
cd frontend
npm run lint
npm run build
```

### Backend

```bash
cd backend
python -m compileall .
```

> Note: dedicated automated backend unit tests are not yet present; syntax validation is currently used as a baseline quality gate.

## CI

GitHub Actions runs on every push and pull request:
- Frontend lint + build
- Backend Python syntax compile check

See `.github/workflows/ci.yml`.

## Contribution

Please read [CONTRIBUTING.md](./CONTRIBUTING.md). In short:
- Fork → feature branch → focused commits → pull request
- Follow Conventional Commit-style messages
- Include verification steps in PR description

## Security

Report vulnerabilities privately using instructions in [SECURITY.md](./SECURITY.md).

## Roadmap

- **Milestone 1:** Add backend unit/integration test suite (pytest)
- **Milestone 2:** Add CSV export/import and transaction filters
- **Milestone 3:** Add recurring expenses and reminder notifications
- **Milestone 4:** Add deployment docs + hosted demo links

## License

This project is licensed under the [MIT License](./LICENSE).

## Contact

- GitHub: [@talha937](https://github.com/talha937)
- Repository: [talha937/expense-tracker](https://github.com/talha937/expense-tracker)
