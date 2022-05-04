from fastapi import APIRouter, Depends
from sqlalchemy import orm

from src.chekers.roles import RolesChecker
from src.database.db_connect import get_db
from src.routers.analyst.controller import controller_count_all_publications, controller_count_publication_by_year, \
    controller_get_analysis_authors, controller_get_analysis_articles, controller_count_authors

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
    result = await controller_count_all_publications(role_access, db)
    return result


@router.get("/count/publications_by_year/")
async def count_publications_by_year(
        years_range: int,
        role_access: bool = Depends(analyst_role),
        db: orm.Session = Depends(get_db)
):
    result = await controller_count_publication_by_year(years_range, role_access, db)
    return result


@router.get("/count/authors")
async def count_authors(
        role_access: bool = Depends(analyst_role),
        db: orm.Session = Depends(get_db)
):
    result = await controller_count_authors(role_access, db)


@router.get('/authors/')
async def get_analysis_authors(role_access: bool = Depends(analyst_role), db: orm.Session = Depends(get_db)):
    result = await controller_get_analysis_authors(role_access, db)
    return result


@router.get('/articles/')
async def get_analysis_articles(role_access: bool = Depends(analyst_role), db: orm.Session = Depends(get_db)):
    result = await controller_get_analysis_articles(role_access, db)
    return result
