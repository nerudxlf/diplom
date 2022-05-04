import sqlalchemy as _sql
import sqlalchemy.ext.declarative as _declarative
import sqlalchemy.orm as _orm

import settings_env

DATABASE_URL: str = f"postgresql+psycopg2://{settings_env.DB_ROOT}:{settings_env.DB_PASSWORD}@{settings_env.DB_HOST}/{settings_env.DB_NAME}"
engine = _sql.create_engine(DATABASE_URL)

SessionLocal = _orm.sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = _declarative.declarative_base()


def create_base():
    return Base.metadata.create_all(bind=engine)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
