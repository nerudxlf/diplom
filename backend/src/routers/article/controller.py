from fastapi import HTTPException, status
from sqlalchemy import orm

from src.routers.article.service import service_get_articles_by_author_name, service_get_document_types, \
    service_get_all_articles, service_get_article_by_id, service_get_all_articles_by_fields, \
    service_update_parameter_article, service_get_articles_by_name, service_delete_article_by_id
from src.scheme.scheme_article import SchemeArticleUpdate


async def controller_get_articles_by_author_name(user: str, db: orm.Session):
    # current_user = service_get_user_by_id(user.user_id)
    # user_full_name = f"{current_user.u_surname} {current_user.u_name[0]}.{current_user.u_patronymic[0]}"
    result = await service_get_articles_by_author_name(user, db)
    return result


async def controller_get_document_types(db: orm.Session):
    result = await service_get_document_types(db)
    return result


async def controller_get_all_articles(search: str, page: int, limit: int, publication_type: str,
                                      start: str, end: str, db: orm.Session):
    pages = page * limit
    articles = None
    if not (search or publication_type or start or end):
        articles = await service_get_all_articles(pages, limit, db)
    elif search or publication_type or start or end:
        if start and end:
            start = int(start)
            end = int(end)
        articles = await service_get_all_articles_by_fields(search, pages, limit, publication_type, start,
                                                            end, db)
    return articles


async def controller_get_article_by_id(id: int, db: orm.Session):
    result = await service_get_article_by_id(id, db)
    if not result:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Публикация не найдена")
    return result


async def controller_update_parameter_article(id: int, article: SchemeArticleUpdate, role_access: bool,
                                              db: orm.Session):
    if not role_access:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    is_article = await service_get_article_by_id(id, db)
    if not is_article:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
    if not isinstance(article.snip, int) or 0 == article.sjr > 5:
        article.snip = None
    if not isinstance(article.jif, int) or 0 == article.sjr > 5:
        article.jif = None
    if not isinstance(article.sjr, int) or 0 == article.sjr > 5:
        article.sjr = None
    if not isinstance(article.cite_score_percentile, int) or 0 == article.sjr > 5:
        article.cite_score_percentile = None
    result = await service_update_parameter_article(id, article, db)
    return result


async def controller_get_articles_by_name(search: str, db: orm.Session):
    articles = await service_get_articles_by_name(search, db)
    return articles


async def controller_delete_article_by_id(id: int, role_access: bool, db: orm.Session):
    if not role_access:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    is_article = await service_get_article_by_id(id, db)
    if not is_article:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Публикация не найдена")
    await service_delete_article_by_id(id, db)
