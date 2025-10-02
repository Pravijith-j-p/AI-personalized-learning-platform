from pydantic import BaseModel, EmailStr

# --- User Creation & Response ---
class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: int
    name: str
    email: EmailStr

    class Config:
        orm_mode = True

# --- User Login ---
class UserLogin(BaseModel):
    email: EmailStr
    password: str

# --- Token ---
class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
