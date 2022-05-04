from fastapi import HTTPException, status
from sqlalchemy import orm

from src.routers.admin.service import service_delete_user, service_change_role, service_admin_create_user, \
    service_get_all_users, service_get_basic_admin_statistic, service_get_roles
from src.routers.user.service import service_get_user_by_email
from src.scheme.scheme_admin import SchemeChangeRole
from src.scheme.scheme_user import SchemeAdminCreateUser


async def controller_admin_create_user(user: SchemeAdminCreateUser, role_access: bool, db: orm.Session):
    if not role_access:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    get_user = await service_get_user_by_email(user.u_email, db)
    if get_user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST)
    result = await service_admin_create_user(user, db)
    return result


async def controller_delete_user(user_id: int, db: orm.Session):
    result = await service_delete_user(user_id, db)
    return result


async def controller_change_role(role: SchemeChangeRole, role_access: bool, db: orm.Session):
    if not role_access:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    await service_change_role(role, db)
    result = await service_get_all_users(db)
    return result


async def controller_get_all_users(role_access: bool, db: orm.Session):
    if not role_access:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    result = await service_get_all_users(db)
    return result


async def controller_get_basic_admin_statistic(role_access: bool, db: orm.Session):
    if not role_access:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    result = await service_get_basic_admin_statistic(db)
    return result


async def controller_get_roles(db: orm.Session):
    result = await service_get_roles(db)
    return result
