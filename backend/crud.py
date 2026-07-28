from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import datetime

try:
    from . import models, schemas
except ImportError:
    import models, schemas


def get_expenses(db: Session, user_id: int, skip: int = 0, limit: int = 100):
    return (
        db.query(models.Expense)
        .filter(models.Expense.user_id == user_id)
        .offset(skip).limit(limit).all()
    )


def get_expense(db: Session, expense_id: int, user_id: int):
    return (
        db.query(models.Expense)
        .filter(models.Expense.id == expense_id, models.Expense.user_id == user_id)
        .first()
    )


def create_expense(db: Session, expense: schemas.ExpenseCreate, user_id: int):
    db_expense = models.Expense(**expense.dict(), user_id=user_id)
    db.add(db_expense)
    db.commit()
    db.refresh(db_expense)
    return db_expense


def update_expense(db: Session, expense_id: int, expense: schemas.ExpenseUpdate, user_id: int):
    db_expense = get_expense(db, expense_id, user_id)
    if not db_expense:
        return None
    for key, value in expense.dict(exclude_unset=True).items():
        setattr(db_expense, key, value)
    db.commit()
    db.refresh(db_expense)
    return db_expense


def delete_expense(db: Session, expense_id: int, user_id: int):
    db_expense = get_expense(db, expense_id, user_id)
    if db_expense:
        db.delete(db_expense)
        db.commit()
    return db_expense


def get_summary(db: Session, user_id: int):
    q = db.query(models.Expense).filter(models.Expense.user_id == user_id)
    total = db.query(func.sum(models.Expense.amount)).filter(models.Expense.user_id == user_id).scalar() or 0
    count = q.count()
    breakdown = dict(
        db.query(models.Expense.category, func.sum(models.Expense.amount))
        .filter(models.Expense.user_id == user_id)
        .group_by(models.Expense.category)
        .all()
    )
    return {"total_expenses": total, "expense_count": count, "category_breakdown": breakdown}


def get_budgets_with_spending(db: Session, user_id: int):
    budgets = db.query(models.Budget).filter(models.Budget.user_id == user_id).all()

    now = datetime.utcnow()
    month_start = datetime(now.year, now.month, 1)

    result = []
    for b in budgets:
        spent = (
            db.query(func.sum(models.Expense.amount))
            .filter(
                models.Expense.user_id == user_id,
                models.Expense.category == b.category,
                models.Expense.date >= month_start,
            )
            .scalar() or 0
        )
        result.append({
            "id": b.id,
            "category": b.category,
            "monthly_limit": b.monthly_limit,
            "spent": spent,
            "percent_used": round((spent / b.monthly_limit) * 100, 1) if b.monthly_limit else 0,
        })
    return result


def create_budget(db: Session, budget: schemas.BudgetCreate, user_id: int):
    existing = (
        db.query(models.Budget)
        .filter(models.Budget.user_id == user_id, models.Budget.category == budget.category)
        .first()
    )
    if existing:
        existing.monthly_limit = budget.monthly_limit
        db.commit()
        db.refresh(existing)
        return existing

    db_budget = models.Budget(**budget.dict(), user_id=user_id)
    db.add(db_budget)
    db.commit()
    db.refresh(db_budget)
    return db_budget


def delete_budget(db: Session, budget_id: int, user_id: int):
    b = db.query(models.Budget).filter(models.Budget.id == budget_id, models.Budget.user_id == user_id).first()
    if b:
        db.delete(b)
        db.commit()
    return b