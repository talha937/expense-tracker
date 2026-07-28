from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import crud, schemas, models
from database import get_db
from auth import get_current_user

router = APIRouter()


@router.get("/")
def list_budgets(db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    return crud.get_budgets_with_spending(db, current_user.id)


@router.post("/", response_model=schemas.BudgetResponse)
def set_budget(budget: schemas.BudgetCreate, db: Session = Depends(get_db),
               current_user: models.User = Depends(get_current_user)):
    b = crud.create_budget(db, budget, current_user.id)
    spending = crud.get_budgets_with_spending(db, current_user.id)
    match = next((x for x in spending if x["id"] == b.id), None)
    return match


@router.delete("/{budget_id}")
def delete_budget(budget_id: int, db: Session = Depends(get_db),
                   current_user: models.User = Depends(get_current_user)):
    deleted = crud.delete_budget(db, budget_id, current_user.id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Budget not found")
    return {"detail": "Budget deleted"}