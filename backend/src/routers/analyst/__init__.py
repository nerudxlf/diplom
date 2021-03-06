from fastapi import APIRouter, Depends
from sqlalchemy import orm

from src.chekers.roles import RolesChecker
from src.database.db_connect import get_db
from src.routers.analyst.controller import controller_count_all_publications, controller_count_publication_by_year, \
    controller_get_analysis_authors, controller_get_analysis_articles, controller_count_authors, \
    controller_get_number_of_authors, controller_get_publication_by_type

router = APIRouter(
    prefix="/api/analyst",
    tags=["analyst"],
    responses={404: {"description": "Not found"}}
)

analyst_role = RolesChecker([2])


@router.get("/count/publications")
async def count_publications(
        role_access: bool = Depends(analyst_role),
        db: orm.Session = Depends(get_db)
):
    """
    Counting all publication
    :param role_access: Current user role
    :param db: Current db Session
    :return:
    """
    result = await controller_count_all_publications(role_access, db)
    return result


@router.get("/count/publications_by_year/")
async def count_publications_by_year(
        years_range: int,
        role_access: bool = Depends(analyst_role),
        db: orm.Session = Depends(get_db)
):
    """
    Counting publication by year
    :param years_range: Number of years
    :param role_access: Current user role
    :param db: Current db Session
    :return:
    """
    result = await controller_count_publication_by_year(years_range, role_access, db)
    return result


@router.get("/count/authors")
async def count_authors(
        role_access: bool = Depends(analyst_role),
        db: orm.Session = Depends(get_db)
):
    """
    Counting authors
    :param role_access: Current user role
    :param db: Current db Session
    :return:
    """
    result = await controller_count_authors(role_access, db)
    return result


@router.get('/authors/')
async def get_analysis_authors(role_access: bool = Depends(analyst_role), db: orm.Session = Depends(get_db)):
    """
    Getting analysis by all authors in the System
    :param role_access: Current user Role
    :param db: Current db Session
    :return:
    """
    result = await controller_get_analysis_authors(role_access, db)
    return result


@router.get('/articles/')
async def get_analysis_articles(role_access: bool = Depends(analyst_role), db: orm.Session = Depends(get_db)):
    """
    Getting analysis by all articles in the System
    :param role_access: Current user Role
    :param db: Current db Session
    :return:
    """
    result = await controller_get_analysis_articles(role_access, db)
    return result


@router.get("/authors/number/")
async def get_number_of_authors(role_access: bool = Depends(analyst_role), db: orm.Session = Depends(get_db)) -> int:
    """
    Getting number of authors
    :param role_access: Current user Role
    :param db: Current db Session
    :return:
    """
    result = await controller_get_number_of_authors(role_access, db)
    return result


@router.get("/count/publications_by_type/")
async def get_publication_by_type(role_access: bool = Depends(analyst_role), db: orm.Session = Depends(get_db)) -> int:
    """
    Getting publication by type
    :param role_access: Current user Role
    :param db: Current db Session
    :return:
    """
    result = await controller_get_publication_by_type(role_access, db)
    return result
