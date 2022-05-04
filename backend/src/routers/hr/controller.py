from fastapi import HTTPException, status
from sqlalchemy import orm

from src.routers.hr.service import service_add_user_workplace, service_delete_user_workplace, \
    service_get_university_by_name, service_get_institute_by_name, service_get_department_by_name, \
    service_get_faculty_by_name, service_get_employees
from src.scheme.scheme_workplaces import SchemeWorkplacesCreate


async def controller_add_user_workplace(
        user_id: int,
        workplace: SchemeWorkplacesCreate,
        role_access: bool,
        db: orm.Session,
):
    if not role_access:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    if workplace.university and not await service_get_university_by_name(workplace.university, db):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="University not found")
    if workplace.institute and not await service_get_institute_by_name(workplace.institute, db):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Institute not found")
    if workplace.department and not await service_get_department_by_name(workplace.department, db):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Department not found")
    if workplace.faculty and not await service_get_faculty_by_name(workplace.faculty, db):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Faculty not found")
    result = await service_add_user_workplace(user_id, workplace, db)
    return result


async def controller_delete_user_workplace(user_id: int, workplace_id: int, role_access: bool, db: orm.Session):
    if not role_access:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    result = await service_delete_user_workplace(user_id, workplace_id, db)
    return result


async def controller_get_employees(role_access: bool, db: orm.Session):
    if not role_access:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    result = await service_get_employees(db)
    return result
