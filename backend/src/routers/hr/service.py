from sqlalchemy import orm

from src.database.db_model import Workplaces, Universities, Institutes, Faculties, Departments, Users
from src.scheme.scheme_workplaces import SchemeWorkplacesCreate


async def service_add_user_workplace(user_id: int, workplace: SchemeWorkplacesCreate, db: orm.Session):
    university = await service_get_university_by_name(workplace.university, db)
    faculty = await service_get_faculty_by_name(workplace.faculty, db)
    department = await service_get_department_by_name(workplace.department, db)
    institute = await service_get_institute_by_name(workplace.institute, db)
    user_workplace = Workplaces(
        university=university,
        institute=institute,
        faculty=faculty,
        department=department,
        position=workplace.position,
        user_id=user_id
    )
    db.add(user_workplace)
    db.commit()
    db.refresh(user_workplace)
    return user_workplace


async def service_delete_user_workplace(user_id: int, workplace_id: int, db: orm.Session):
    workplace = db.query(Workplaces).filter(Workplaces.user_id == user_id,
                                            Workplaces.workplace_id == workplace_id).first()
    db.delete(workplace)
    db.commit()
    return dict(status_code=200, detail="Deleted")


async def service_get_university_by_name(name: str, db: orm.Session):
    return db.query(Universities).filter(Universities.name == name).first()


async def service_get_institute_by_name(name: str, db: orm.Session):
    return db.query(Institutes).filter(Institutes.name == name).first()


async def service_get_faculty_by_name(name: str, db: orm.Session):
    return db.query(Faculties).filter(Faculties.name == name).first()


async def service_get_department_by_name(name: str, db: orm.Session):
    return db.query(Departments).filter(Departments.name == name).first()


async def service_get_employees(db: orm.Session):
    result = []
    employees = db.query(Users).all()
    for employee in employees:
        workplaces = []
        if employee.patronymic:
            name = f"{employee.surname} {employee.name[0]}. {employee.patronymic[0]}."
        else:
            name = f"{employee.surname} {employee.name[0]}."
        if employee.workplace:
            for workplace in employee.workplace:
                workplaces.append(dict(
                    university=workplace.university.name if workplace.university else None,
                    institute=workplace.institute.name if workplace.institute else None,
                    faculty=workplace.faculty.name if workplace.faculty else None,
                    department=workplace.department.name if workplace.department else None,
                    position=workplace.position if workplace.position else None
                ))
        else:
            workplaces.append(dict(
                university=None,
                institute=None,
                faculty=None,
                department=None,
                position=None
            ))
        result.append(
            dict(
                id=employee.user_id,
                name=name,
                phone=employee.phone.replace(' ', ''),
                email=employee.email,
                workplaces=workplaces
            )
        )
    return result

