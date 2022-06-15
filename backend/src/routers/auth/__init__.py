from fastapi import APIRouter, Depends, security
from sqlalchemy import orm

from src.database.db_connect import get_db
from src.routers.auth.controller import controller_generate_token
from src.routers.user.controller import controller_create_new_user
from src.scheme.scheme_user import SchemeUserCreate

router = APIRouter(
    prefix="/api/auth",
    tags=["auth"],
    responses={404: {"description": "Not found"}}
)


@router.post("/registration")
async def registration(user: SchemeUserCreate, db: orm.Session = Depends(get_db)):
    """
    User registration
    :param user: Scheme User Create
    :param db: Current db Session
    :return:
    """
    token = await controller_create_new_user(user, db)
    return token


@router.post("/token")
async def login(form_data: security.OAuth2PasswordRequestForm = Depends(), db: orm.Session = Depends(get_db)):
    """
    Login user
    :param form_data: login data
    :param db: Current db Session
    :return: JWT-token
    """
    token = await controller_generate_token(form_data, db)
    return token
