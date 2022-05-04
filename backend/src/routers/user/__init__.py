from fastapi import APIRouter, Depends
from sqlalchemy import orm

from src.database.db_connect import get_db
from src.routers.user.controller import controller_get_user_by_id, controller_get_current_user, controller_delete_me, \
    controller_get_user_workplaces, controller_get_user_indicators, controller_add_user_indicators, \
    controller_add_new_article_check, controller_get_unverified_articles_by_user, \
    controller_delete_unverified_articles_by_id, controller_update_user_indicators, controller_add_research_field, \
    controller_get_research_fields_by_user_id, controller_delete_research_field, controller_get_authors_by_name, \
    controller_get_user_articles, controller_get_all_employees, controller_delete_article_by_id, \
    controller_get_all_university_units, controller_get_basic_statistic, controller_get_summary_statistic, \
    controller_get_graph, controller_get_all_by_departments
from src.scheme.scheme_indicators import SchemeIndicators
from src.scheme.scheme_user import SchemeUser

router = APIRouter(
    prefix="/api/users",
    tags=["users"],
    responses={404: {"description": "Not found"}}
)


@router.get("/{id}")
async def get_user(id: int, db: orm.Session = Depends(get_db)):
    """
    Getting a user by id
    :param id: user id
    :param db: Current db Session
    :return: Scheme User
    """
    user = await controller_get_user_by_id(id, db)
    return user


@router.get('/{id}/articles')
async def get_user_articles(id: int, db: orm.Session = Depends(get_db)):
    result = await controller_get_user_articles(id, db)
    return result


@router.delete('/articles/{id}')
async def delete_user_article(id: int, user: SchemeUser = Depends(controller_get_current_user),
                              db: orm.Session = Depends(get_db)):
    result = await controller_delete_article_by_id(id, user, db)
    return result


@router.get('/{id}/workplaces')
async def get_user_workplaces(id: int, db: orm.Session = Depends(get_db)):
    """
    Getting a user workplace by id
    :param id: user id
    :param db: Current db Session
    :return: Workplaces list
    """
    workplaces = await controller_get_user_workplaces(id, db)
    return workplaces


@router.post('/research_fields/{field}')
async def add_research_field(field: str, user: SchemeUser = Depends(controller_get_current_user),
                             db: orm.Session = Depends(get_db)):
    result = await controller_add_research_field(field, user, db)
    return result


@router.delete('/research_fields/{id}')
async def delete_research_field(id: int, user: SchemeUser = Depends(controller_get_current_user),
                                db: orm.Session = Depends(get_db)):
    result = await controller_delete_research_field(id, user, db)
    return result


@router.get('/{id}/research_fields')
async def get_research_fields_by_user_id(id: int, db: orm.Session = Depends(get_db)):
    result = await controller_get_research_fields_by_user_id(id, db)
    return result


@router.get('/{id}/indicators')
async def get_user_indicators(id: int, db: orm.Session = Depends(get_db)):
    """
    Getting a user indicators by id
    :param id: user id
    :param db: current db session
    :return:  indicators by IndicatorsScheme
    """
    indicators = await controller_get_user_indicators(id, db)
    return indicators


@router.patch('/indicators')
async def add_indicators(
        indicators: SchemeIndicators,
        db: orm.Session = Depends(get_db),
        user: SchemeUser = Depends(controller_get_current_user)
):
    print(indicators)
    result = await controller_update_user_indicators(indicators, db, user)
    return result


@router.patch('/{id}/workplaces')
async def update_field_user_workplaces(
        id: int,
        db: orm.Session = Depends(get_db),
        user: SchemeUser = Depends(controller_get_current_user)
):
    pass


@router.get("/current/me", response_model=SchemeUser)
async def get_me(user: SchemeUser = Depends(controller_get_current_user)):
    return user


@router.delete("/me")
async def delete_me(user: SchemeUser = Depends(controller_get_current_user), db: orm.Session = Depends(get_db)):
    result = await controller_delete_me(user.user_id, db)
    return result


@router.patch("/me")
async def patch_me(user: SchemeUser = Depends(controller_get_current_user), db: orm.Session = Depends(get_db)):
    pass


@router.put("/me")
async def update_me(user: SchemeUser = Depends(controller_get_current_user), db: orm.Session = Depends(get_db)):
    pass


@router.post('/unverified_articles')
async def add_new_article_check(link: str, user: SchemeUser = Depends(controller_get_current_user),
                                db: orm.Session = Depends(get_db)):
    result = await controller_add_new_article_check(link, user, db)
    return result


@router.get('/unverified_articles/')
async def get_unverified_articles_by_user(user: SchemeUser = Depends(controller_get_current_user),
                                          db: orm.Session = Depends(get_db)):
    result = await controller_get_unverified_articles_by_user(user, db)
    return result


@router.delete("/unverified_articles/")
async def delete_unverified_articles_by_id(id: int, user: SchemeUser = Depends(controller_get_current_user),
                                           db: orm.Session = Depends(get_db)):
    result = await controller_delete_unverified_articles_by_id(id, user, db)
    return result


@router.get('/authors/')
async def get_authors_by_name(search: str, db: orm.Session = Depends(get_db)):
    result = await controller_get_authors_by_name(search, db)
    return result


@router.get("/all/")
async def get_all_employees(query: str, db: orm.Session = Depends(get_db)):
    result = await controller_get_all_employees(query, db)
    return result


@router.get("/university_units/")
async def get_all_university_units(db: orm.Session = Depends(get_db)):
    result = await controller_get_all_university_units(db)
    return result


@router.get("/{id}/statistic/basic/")
async def get_basic_statistic(id: int, db: orm.Session = Depends(get_db)):
    result = await controller_get_basic_statistic(id, db)
    return result


@router.get("/{id}/statistic/summary/")
async def get_summary_statistic(id: int, db: orm.Session = Depends(get_db)):
    result = await controller_get_summary_statistic(id, db)
    return result


@router.get("/{id}/statistic/graph/")
async def get_graph(id: int, db: orm.Session = Depends(get_db)):
    result = await controller_get_graph(id, db)
    return result


@router.get("/all/departments/")
async def get_all_by_departments(query: str, db: orm.Session = Depends(get_db)):
    result = await controller_get_all_by_departments(query, db)
    return result