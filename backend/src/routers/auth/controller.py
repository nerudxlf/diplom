from fastapi import HTTPException, status, security
from sqlalchemy import orm

from src.routers.auth.service import service_create_token
from src.routers.user.service import service_get_user_by_email


async def controller_generate_token(form_data: security.OAuth2PasswordRequestForm, db: orm.Session):
    user = await controller_auth_user(form_data.username, form_data.password, db)
    if not user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Данные неверны")
    token = await service_create_token(user)
    return token


async def controller_auth_user(email: str, password: str, db: orm.Session):
    user = await service_get_user_by_email(email, db)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Пользователь не найден")
    if not user.verify_password(password):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Логин или пароль введены некорректно")
    return user

