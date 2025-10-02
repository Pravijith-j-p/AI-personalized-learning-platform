from sqlalchemy.orm import Session
from . import models
from .schemas import UserCreate
from passlib.context import CryptContext

# Use Argon2 for stronger password hashing
pwd_context = CryptContext(
    schemes=["argon2", "bcrypt"],
    deprecated="auto"
)


# --- Password Utilities ---
def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

# --- User CRUD ---
def create_user(db: Session, user: UserCreate):
    hashed_password = get_password_hash(user.password)
    db_user = models.User(
        name=user.name,
        email=user.email,
        hashed_password=hashed_password
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()
