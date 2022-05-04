from fastapi import APIRouter, Depends
from sqlalchemy import orm

from src.chekers.roles import RolesChecker
from src.database.db_connect import get_db
from src.routers.hr.controller import controller_add_user_workplace, controller_delete_user_workplace, \
    controller_get_employees
from src.routers.user import controller_get_current_user
from src.scheme.scheme_user import SchemeUser
from src.scheme.scheme_workplaces import SchemeWorkplacesCreate

router = APIRouter(
    prefix="/api/hr",
    tags=["hr"],
    responses={404: {"description": "Not found"}}
)

operator_role = RolesChecker([5])


@router.get('/user/workplaces/')
async def get_employees(
        role_access: bool = Depends(operator_role),
        db: orm.Session = Depends(get_db)
):
    result = await controller_get_employees(role_access, db)
    return result


@router.post('/user/{user_id}/workplaces/')
async def add_user_workplaces(
        user_id: int,
        workplace: SchemeWorkplacesCreate,
        db: orm.Session = Depends(get_db),
        role_access: bool = Depends(operator_role)
):
    """
    Adding a new user workplace
    :param role_access:
    :param user_id:
    :param workplace: Workplace by WorkplaceScheme
    :param db: Current db Session
    :return: a new user workplace
    """
    result = await controller_add_user_workplace(user_id, workplace, role_access, db)
    return result


@router.delete('/user/{user_id}/workplaces/{workplace_id}')
async def delete_workplace(
        user_id: int,
        workplace_id: int,
        db: orm.Session = Depends(get_db),
        role_access: bool = Depends(operator_role)
):
    """
    Deleting an old user workplace
    :param role_access:
    :param user_id:
    :param workplace_id: workplace id
    :param db: current db session
    :return:
    """
    result = await controller_delete_user_workplace(user_id, workplace_id, role_access, db)
    return result
