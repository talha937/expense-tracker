# 💸 Expense Tracker

> **Know where your money goes. Before it's gone.**

A full-stack expense tracking app built with **React** and **FastAPI** — featuring user authentication, real-time budget monitoring, and category-wise spending analytics. Designed to be clean, fast, and portfolio-ready.

---

## ✨ What It Does

| Feature | Description |
|---|---|
| 🔐 **Auth** | Register and log in securely. All data is user-specific and protected. |
| 📝 **Expense CRUD** | Add, edit, delete, and clear expenses with title, amount, category, date, and notes. |
| 📊 **Spending Insights** | Automatic summary: total spend, expense count, and category breakdown. |
| 💰 **Budget Tracking** | Set monthly limits per category. Visually track progress and spot overruns fast. |
| 🎨 **Polished UI** | Responsive layout with smooth Framer Motion animations. Built to impress. |
| 🗄️ **Flexible DB** | Uses MySQL in production. Falls back to SQLite for local dev — zero config needed. |

---

## 🛠️ Tech Stack

**Frontend**
- React + Vite
- Axios
- Framer Motion

**Backend**
- FastAPI
- SQLAlchemy + Pydantic
- Uvicorn

**Database**
- MySQL (production)
- SQLite (local fallback)

---

## 📁 Project Structure

```
expense-tracker/
├── backend/
│   ├── routers/        # Route handlers (expenses, auth, budgets)
│   ├── models.py       # SQLAlchemy ORM models
│   ├── schemas.py      # Pydantic request/response schemas
│   ├── crud.py         # Database operations
│   ├── database.py     # DB connection and session
│   └── main.py         # App entry point
├── frontend/
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   └── pages/      # Route-level page views
│   └── ...
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js
- Python 3.10+
- MySQL *(optional — SQLite works out of the box)*

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Environment Variables

**Frontend** — create `frontend/.env`:
```env
VITE_API_URL=http://127.0.0.1:8000
```

**Backend** — set these to use MySQL (leave unset to use SQLite):
```env
DB_USER=
DB_PASSWORD=
DB_HOST=
DB_PORT=3306
DB_NAME=
```

---

## 📡 API Reference

### Expenses
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/expenses/` | List all expenses |
| `POST` | `/api/expenses/` | Create a new expense |
| `GET` | `/api/expenses/{id}` | Get a single expense |
| `PUT` | `/api/expenses/{id}` | Update an expense |
| `DELETE` | `/api/expenses/{id}` | Delete an expense |
| `GET` | `/api/expenses/summary` | Get spending summary |

### Auth
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/register` | Register a new user |
| `POST` | `/api/auth/login` | Log in and receive a token |

### Budgets
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/budgets/` | List all budgets |
| `POST` | `/api/budgets/` | Create a budget |
| `DELETE` | `/api/budgets/{id}` | Remove a budget |

---

## 📸 Screenshots

> *Add screenshots here to make this repo stand out to recruiters.*

```
docs/screenshots/dashboard.png
docs/screenshots/add-expense.png
docs/screenshots/budget-tracker.png
```

---

## 🧠 Why This Project

This isn't just another CRUD app. It's a demonstration of how real products are built:

- **REST API design** with clean separation of concerns
- **Stateful frontend** with component reuse and route management
- **Secure auth** with protected, user-scoped data
- **Database flexibility** — MySQL for production, SQLite for development
- **Data analytics** — budget progress, category totals, expense summaries
- **Production-ready structure** — routers, schemas, models, CRUD all separated properly

---

## 🗺️ Roadmap

- [ ] Export expenses to CSV / PDF
- [ ] Monthly and yearly reports
- [ ] Search and filter by category or date range
- [ ] Dark / light theme toggle
- [ ] Email alerts when approaching budget limits
- [ ] Multi-currency support

---

## 📄 License

This project is available under the [MIT License](LICENSE).

---

<p align="center">Built with 💻 and a healthy fear of overspending.</p>
