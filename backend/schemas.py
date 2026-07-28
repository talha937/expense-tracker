from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
from models import Category


class ExpenseBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=100)
    amount: float = Field(..., gt=0)
    category: str = Field(default=Category.OTHER.value)
    description: Optional[str] = Field(None, max_length=500)
    date: Optional[datetime] = None


class ExpenseCreate(ExpenseBase):
    pass


class ExpenseUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=1, max_length=100)
    amount: Optional[float] = Field(None, gt=0)
    category: Optional[str] = None
    description: Optional[str] = Field(None, max_length=500)
    date: Optional[datetime] = None


class ExpenseResponse(ExpenseBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class ExpenseSummary(BaseModel):
    total_expenses: float
    expense_count: int
    category_breakdown: dict[str, float]


class UserCreate(BaseModel):
    email: str
    password: str = Field(..., min_length=6)


class UserLogin(BaseModel):
    email: str
    password: str


class UserResponse(BaseModel):
    id: int
    email: str

    class Config:
        from_attributes = True


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"

class BudgetCreate(BaseModel):
    category: str
    monthly_limit: float = Field(..., gt=0)


class BudgetResponse(BaseModel):
    id: int
    category: str
    monthly_limit: float
    spent: float
    percent_used: float

    class Config:
        from_attributes = True