from fastapi import security
import jwt as _jwt
from settings_env import SECRET_KEY
from src.database.db_model import Users
from src.scheme.scheme_user import SchemeUser


async def service_create_token(user: Users):
    user_object = SchemeUser.from_orm(user)
    token = _jwt.encode(user_object.dict(), SECRET_KEY)
    return dict(access_token=token, token_type="bearer")


def service_oauth2scheme():
    return security.OAuth2PasswordBearer(tokenUrl="/api/auth/token")
