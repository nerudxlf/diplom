import json

import jwt
from fastapi import HTTPException, status, Depends
from sqlalchemy import orm

from settings_env import SECRET_KEY
from src.database.db_connect import get_db
from src.routers.auth.service import service_create_token, service_oauth2scheme
from src.routers.user.service import service_get_user_by_email, service_create_new_user, service_get_user_by_id, \
    service_delete_me, service_get_user_workplaces, service_get_user_indicators, service_add_user_indicators, \
    service_add_new_article_check, \
    service_get_unverified_articles_by_user, service_delete_unverified_articles_by_id, service_update_user_indicators, \
    service_add_research_field, service_get_research_fields_by_user_id, service_get_current_research_field, \
    service_delete_research_field, service_get_authors_by_name, service_get_user_articles, service_delete_article_by_id, \
    service_get_all_university_units, service_get_all_employees, service_get_user_by_phone, service_get_basic_statistic, \
    service_get_summary_statistic, service_get_graph, service_get_all_by_department, service_get_all_by_faculty, \
    service_change_password, service_user_get_article_by_id, service_get_user_publication_by_id
from src.scheme.scheme_indicators import SchemeIndicators
from src.scheme.scheme_user import SchemeUserCreate, SchemeUser, SchemeUserReturn


async def controller_create_new_user(user: SchemeUserCreate, db: orm.Session):
    old_user_by_email = await service_get_user_by_email(user.email, db)
    old_user_by_phone = await service_get_user_by_phone(user.phone, db)
    if old_user_by_email or old_user_by_phone:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,
                            detail="Пользователь с таким email или телефоном уже существует")
    new_user = await service_create_new_user(user, db)
    token = await service_create_token(new_user)
    return token


async def controller_get_user_by_id(user_id: int, db: orm.Session):
    user = await service_get_user_by_id(user_id, db)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    return SchemeUserReturn.from_orm(user)


async def controller_get_current_user(token: str = Depends(service_oauth2scheme()), db: orm.Session = Depends(get_db)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        user = await service_get_user_by_id(payload["user_id"], db)
    except:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Ошибка в логине или пароле")
    return SchemeUser.from_orm(user)


async def controller_delete_me(user_id: int, db: orm.Session):
    result = await service_delete_me(user_id, db)
    return result


async def controller_get_user_workplaces(user_id: int, db: orm.Session):
    result = await service_get_user_workplaces(user_id, db)
    return result


async def controller_get_user_indicators(user_id: int, db: orm.Session):
    result = await service_get_user_indicators(user_id, db)
    return SchemeIndicators.from_orm(result)


async def controller_add_user_indicators(user_id: int, indicators: SchemeIndicators, db: orm.Session, user: SchemeUser):
    if user_id != user.user_id:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Ошибка в логине или пароле")
    result = await service_add_user_indicators(user_id, indicators, db)
    return result


async def controller_update_user_indicators(indicators: SchemeIndicators, db: orm.Session, user: SchemeUser):
    result = await service_update_user_indicators(indicators, db, user)
    return result


async def controller_add_new_article_check(link: str, user: SchemeUser, db: orm.Session):
    number_unconfirmed_publication = await service_get_unverified_articles_by_user(user.user_id, db)
    if len(number_unconfirmed_publication) > 5:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail="Number of unconfirmed publications more than 5")
    result = await service_add_new_article_check(link, user.user_id, db)
    return result


async def controller_get_unverified_articles_by_user(user: SchemeUser, db: orm.Session):
    result = await service_get_unverified_articles_by_user(user.user_id, db)
    return result


async def controller_delete_unverified_articles_by_id(unverified_article_id: int, user, db: orm.Session):
    await service_delete_unverified_articles_by_id(unverified_article_id, db)
    result = await service_get_unverified_articles_by_user(user.user_id, db)
    return result


async def controller_add_research_field(field: str, user: SchemeUser, db: orm.Session):
    result = await service_add_research_field(field, user.user_id, db)
    return result


async def controller_get_research_fields_by_user_id(id: int, db: orm.Session):
    user = await service_get_user_by_id(id, db)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
    result = await service_get_research_fields_by_user_id(id, db)
    return result


async def controller_delete_research_field(id: int, user: SchemeUser, db: orm.Session):
    current_research_field = service_get_current_research_field(id, db)
    if not current_research_field:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
    result = await service_delete_research_field(id, user.user_id, db)
    return result


async def controller_get_authors_by_name(search: str, db: orm.Session):
    result = await service_get_authors_by_name(search, db)
    return result


async def controller_get_user_articles(id: int, db: orm.Session):
    current_user = await service_get_user_by_id(id, db)
    if not current_user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
    result = await service_get_user_articles(id, db)
    return result


async def controller_get_all_employees(query: str, db: orm.Session):
    result = await service_get_all_employees(query, db)
    return result


async def controller_delete_article_by_id(id: int, user: SchemeUser, db: orm.Session):
    await service_delete_article_by_id(id, user.user_id, db)
    result = await service_get_user_articles(user.user_id, db)
    return result


async def controller_get_all_university_units(db: orm.Session):
    result = await service_get_all_university_units(db)
    return result


async def controller_get_basic_statistic(id: int, db: orm.Session):
    result = await service_get_basic_statistic(id, db)
    return result


async def controller_get_summary_statistic(id: int, db: orm.Session):
    result = await service_get_summary_statistic(id, db)
    return result


async def controller_get_graph(id: int, db: orm.Session):
    result = await service_get_graph(id, db)
    return result


async def controller_get_all_by_departments(query: str, db: orm.Session):
    result = await service_get_all_by_department(query, db)
    return result


async def controller_get_all_by_faculty(query: str, db: orm.Session):
    result = await service_get_all_by_faculty(query, db)
    return result


async def controller_password_verification(password: str, user: SchemeUser, db: orm.Session):
    current_user = await service_get_user_by_id(user.user_id, db)
    if not current_user.verify_password(password):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Пароль введен некорректно")
    return json.dumps({"message": "ok"})


async def controller_change_password(password: str, user: SchemeUser, db: orm.Session):
    result = await service_change_password(password, user, db)
    return result


async def controller_add_new_article_by_id(id: int, user: SchemeUser, db: orm.Session):
    article = await service_user_get_article_by_id(id, db)
    if not article:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Article not found")
    number_unconfirmed_publication = await service_get_unverified_articles_by_user(user.user_id, db)
    if len(number_unconfirmed_publication) > 4:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail="Number of unconfirmed publications more than 5")
    check_article = await service_get_user_publication_by_id(user.user_id, id, db)
    if check_article:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="")
    for a in number_unconfirmed_publication:
        if a.link == article.link:
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="")
    result = await service_add_new_article_check(article.link, user.user_id, db)
    return result
