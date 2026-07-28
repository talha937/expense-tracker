from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import crud, schemas, models
from database import get_db
from auth import get_current_user

router = APIRouter()


@router.get("/", response_model=list[schemas.ExpenseResponse])
def list_expenses(skip: int = 0, limit: int = 100, db: Session = Depends(get_db),
                   current_user: models.User = Depends(get_current_user)):
    return crud.get_expenses(db, current_user.id, skip, limit)


@router.post("/", response_model=schemas.ExpenseResponse)
def create_expense(expense: schemas.ExpenseCreate, db: Session = Depends(get_db),
                    current_user: models.User = Depends(get_current_user)):
    return crud.create_expense(db, expense, current_user.id)


@router.get("/summary", response_model=schemas.ExpenseSummary)
def summary(db: Session = Depends(get_db),
            current_user: models.User = Depends(get_current_user)):
    return crud.get_summary(db, current_user.id)


@router.get("/{expense_id}", response_model=schemas.ExpenseResponse)
def get_expense(expense_id: int, db: Session = Depends(get_db),
                 current_user: models.User = Depends(get_current_user)):
    expense = crud.get_expense(db, expense_id, current_user.id)
    if not expense:
        raise HTTPException(status_code=404, detail="Expense not found")
    return expense


@router.put("/{expense_id}", response_model=schemas.ExpenseResponse)
def update_expense(expense_id: int, expense: schemas.ExpenseUpdate, db: Session = Depends(get_db),
                    current_user: models.User = Depends(get_current_user)):
    updated = crud.update_expense(db, expense_id, expense, current_user.id)
    if not updated:
        raise HTTPException(status_code=404, detail="Expense not found")
    return updated


@router.delete("/{expense_id}")
def delete_expense(expense_id: int, db: Session = Depends(get_db),
                    current_user: models.User = Depends(get_current_user)):
    deleted = crud.delete_expense(db, expense_id, current_user.id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Expense not found")
    return {"detail": "Expense deleted"}