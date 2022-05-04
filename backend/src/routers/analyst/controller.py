from datetime import datetime

from fastapi import HTTPException, status
from sqlalchemy import orm

from src.routers.analyst.service import service_count_all_publications, service_count_publications_by_year, \
    service_count_authors, service_count_review, service_count_article, service_get_analysis_authors, \
    service_get_analysis_articles


async def controller_count_all_publications(role_access: bool, db: orm.Session):
    if not role_access:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    all_publication = await service_count_all_publications(db)
    article = await service_count_article(db)
    review = await service_count_review(db)
    return dict(all_publication=all_publication, article=article, review=review)


async def controller_count_publication_by_year(years_range: int, role_access: bool, db: orm.Session):
    if not years_range:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST)
    if not role_access:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    current_years = [str(i) for i in range((datetime.now().year - years_range), int(datetime.now().year))]
    result = await service_count_publications_by_year(current_years, db)
    return result


async def controller_count_authors(role_access: bool, db: orm.Session):
    if not role_access:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    result = await service_count_authors(db)
    return result


async def controller_get_analysis_authors(role_access: bool, db: orm.Session):
    if not role_access:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    result = await service_get_analysis_authors(db)
    return result


async def controller_get_analysis_articles(role_access: bool, db: orm.Session):
    if not role_access:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    result = await service_get_analysis_articles(db)
    return result
