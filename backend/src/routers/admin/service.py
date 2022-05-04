from sqlalchemy import orm

from src.database.db_model import Users, Authors, Roles
from src.scheme.scheme_admin import SchemeChangeRole
from src.scheme.scheme_user import SchemeAdminCreateUser


async def service_update_role(user, role_id: int, db: orm.Session):
    user.role_id = role_id
    db.commit()
    db.refresh(user)
    return user


async def service_admin_create_user(user: SchemeAdminCreateUser, db: orm.Session):
    pass


async def service_delete_user(user_id: int, db: orm.Session):
    user = db.query(Users).filter(Users.user_id == user_id).first()
    db.delete(user)
    db.commit()
    return "ok"


async def service_change_role(role: SchemeChangeRole, db: orm.Session):
    user = db.query(Users).filter(Users.user_id == role.id).first()
    user.role.name = role.role
    db.commit()
    db.refresh(user)
    return "ok"


async def service_get_all_users(db: orm.Session):
    result = []
    users = db.query(Users).all()
    for user in users:
        result.append({
            'id': user.user_id,
            'name': user.name,
            'surname': user.surname,
            'patronymic': user.patronymic,
            'email': user.email,
            'phone': user.phone,
            'role': user.role.name
        })

    return result


async def service_get_basic_admin_statistic(db: orm.Session):
    authors = db.query(Authors).all()
    number_authors = [i.user_id for i in authors]
    number_authors = len(set(number_authors))
    hr = db.query(Users).filter(Users.role_id == 5).count()
    admins = db.query(Users).filter(Users.role_id == 4).count()
    operators = db.query(Users).filter(Users.role_id == 3).count()
    analysts = db.query(Users).filter(Users.role_id == 2).count()
    users = db.query(Users).filter(Users.role_id == 1).count()
    return dict(authors=number_authors, admins=admins, operators=operators, analysts=analysts, users=users, hr=hr)


async def service_get_roles(db: orm.Session):
    roles = db.query(Roles).all()
    result = []
    for role in roles:
        result.append({"id": role.role_id, "label": role.name})
    return result
