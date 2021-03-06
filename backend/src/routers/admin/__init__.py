from fastapi import APIRouter, Depends, status
from sqlalchemy import orm

from src.chekers.roles import RolesChecker
from src.database.db_connect import get_db
from src.routers.admin.controller import controller_delete_user, \
    controller_change_role, controller_get_all_users, controller_admin_create_user, \
    controller_get_basic_admin_statistic, controller_get_roles
from src.scheme.scheme_admin import SchemeChangeRole
from src.scheme.scheme_user import SchemeAdminCreateUser

router = APIRouter(
    prefix="/api/admin",
    tags=["admin"],
    responses={404: {"description": "Not found"}}
)

admin_role = RolesChecker([4])


@router.post('/create_user', status_code=status.HTTP_201_CREATED)
async def add_operator(
        user: SchemeAdminCreateUser,
        db: orm.Session = Depends(get_db),
        role_access: bool = Depends(admin_role)
):
    """
    :param user: Scheme Admin Create User
    :param db: Current db Session
    :param role_access: Current user role
    :return:
    """
    result = await controller_admin_create_user(user, role_access, db)
    return result


@router.get('/users')
async def get_all_users(role_access: bool = Depends(admin_role), db: orm.Session = Depends(get_db)):
    """
    Getting all users
    :param role_access: Current user Role
    :param db: Current db Session
    :return:
    """
    result = await controller_get_all_users(role_access, db)
    return result


@router.patch('/roles/')
async def change_role(
        role: SchemeChangeRole,
        db: orm.Session = Depends(get_db),
        role_access: bool = Depends(admin_role)
):
    """
    Changing user role
    :param role:
    :param db:
    :param role_access:
    :return:
    """
    result = await controller_change_role(role, role_access, db)
    return result


@router.delete('/user/{id}', status_code=status.HTTP_200_OK)
async def delete_user(
        user_id: int,
        db: orm.Session = Depends(get_db),
        role_access: bool = Depends(admin_role)
):
    """
    Deleting user by id
    :param user_id: ID
    :param db: Current db Session
    :param role_access: User role access
    :return:
    """
    result = await controller_delete_user(user_id, role_access, db)
    return result


@router.get('/statistic/base')
async def get_basic_admin_statistic(role_access: bool = Depends(admin_role), db: orm.Session = Depends(get_db)):
    """
    Getting basic statistic by authors
    :param role_access: Current user role
    :param db: Current db Session
    :return:
    """
    result = await controller_get_basic_admin_statistic(role_access, db)
    return result


@router.get('/roles/')
async def get_roles(db: orm.Session = Depends(get_db)):
    """
    Getting users roles
    :param db: Current db Session
    :return:
    """
    result = await controller_get_roles(db)
    return result
