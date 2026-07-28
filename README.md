# Expense Tracker

A modern full-stack expense tracking application designed to help users record spending, manage budgets, and gain quick insight into their financial habits.

Built with a React frontend and FastAPI backend, this project demonstrates a practical production-style architecture with authentication, CRUD operations, budget monitoring, and expense summary analytics.

---

## Features

- **User authentication**
  - Register and log in securely
  - Protected, user-specific data access

- **Expense management**
  - Add expenses with title, amount, category, description, and date
  - View expenses in a clean, interactive dashboard
  - Edit and delete entries inline
  - Clear all expenses with one action

- **Financial insights**
  - Automatic expense summary calculations
  - Category-wise breakdown of spending
  - Total expense and count overview

- **Budget tracking**
  - Set monthly budget limits by category
  - Monitor spending progress visually
  - Highlight near-limit and over-budget categories

- **Modern UI/UX**
  - Responsive layout
  - Smooth animations with Framer Motion
  - Clean, recruiter-friendly visual design

- **Flexible database support**
  - Uses MySQL when environment variables are configured
  - Falls back to SQLite for local development

---

## Tech Stack

### Frontend
- React
- Vite
- Axios
- Framer Motion

### Backend
- FastAPI
- SQLAlchemy
- Pydantic
- Uvicorn

### Database
- MySQL
- SQLite fallback for local development

### Languages
- JavaScript
- Python
- CSS
- HTML

---

## Project Structure

```bash
expense-tracker/
├── backend/
│   ├── routers/
│   ├── schemas.py
│   ├── models.py
│   ├── crud.py
│   ├── database.py
│   └── main.py
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   └── pages/
│   └── ...
└── README.md
```

---

## Key Highlights

This project is more than a simple expense logger. It includes:

- secure, user-based data handling
- structured REST API design
- reusable frontend components
- budget analytics and summary reporting
- clear separation between frontend and backend
- a polished UI suitable for portfolio presentation

---

## API Overview

### Expenses
- `GET /api/expenses/` — List expenses
- `POST /api/expenses/` — Create a new expense
- `GET /api/expenses/{expense_id}` — Get a single expense
- `PUT /api/expenses/{expense_id}` — Update an expense
- `DELETE /api/expenses/{expense_id}` — Delete an expense
- `GET /api/expenses/summary` — Get expense summary data

### Authentication
- `POST /api/auth/register` — Register a new user
- `POST /api/auth/login` — Log in and receive a token

### Budgets
- `GET /api/budgets/` — List budgets
- `POST /api/budgets/` — Create a budget
- `DELETE /api/budgets/{budget_id}` — Remove a budget

---

## Setup Instructions

### Prerequisites
- Node.js
- Python 3.10+
- MySQL optional, SQLite works out of the box

### Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate   # On Windows: venv\\Scripts\\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## Environment Variables

### Frontend
Create a `.env` file inside `frontend/`:

```bash
VITE_API_URL=http://127.0.0.1:8000
```

### Backend
If using MySQL, configure the following environment variables:

```bash
DB_USER=
DB_PASSWORD=
DB_HOST=
DB_PORT=3306
DB_NAME=
```

If these are not set, the app automatically uses SQLite locally.

---

## Screenshots

Add screenshots here to showcase the UI and make the repository look even stronger to recruiters.

Example:

```markdown
![Dashboard](docs/screenshots/dashboard.png)
![Add Expense](docs/screenshots/add-expense.png)
![Budget Tracker](docs/screenshots/budget-tracker.png)
```

---

## Why This Project Stands Out

This repository showcases practical full-stack engineering skills, including:

- API design and integration
- stateful frontend architecture
- database modeling and validation
- user authentication
- responsive UI development
- data visualization and budget monitoring

It is a strong portfolio project for demonstrating real-world product thinking and implementation quality.

---

## Future Improvements

- Export expenses to CSV/PDF
- Monthly and yearly reports
- Search and filtering by category or date
- Dark/light theme toggle
- Email alerts for budget limits
- Multi-currency support

---

## License

This project is available under the MIT License.
