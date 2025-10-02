from . import models
from .database import engine

# Drop all tables (WARNING: this deletes all data)
models.Base.metadata.drop_all(bind=engine)

# Recreate tables with updated schema
models.Base.metadata.create_all(bind=engine)

print("Database reset complete!")
