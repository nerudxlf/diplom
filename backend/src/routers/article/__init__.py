from fastapi import APIRouter, Depends
from sqlalchemy import orm

from src.chekers.roles import RolesChecker
from src.database.db_connect import get_db
from src.routers.article.controller import controller_get_articles_by_author_name, controller_get_document_types, \
    controller_get_all_articles, controller_get_article_by_id, controller_update_parameter_article, \
    controller_get_articles_by_name, controller_delete_article_by_id
from src.scheme.scheme_article import SchemeArticleUpdate

router = APIRouter(
    prefix="/api/articles",
    tags=["articles"],
    responses={404: {"description": "Not found"}}
)

operator_role = RolesChecker([3])


# Поиск
@router.get("")
async def get_articles(page: int, limit: int = 20, publication_type: str = None,
                       start: str = None, end: str = None,search: str = None,
                       db: orm.Session = Depends(get_db)):
    articles = await controller_get_all_articles(search, page, limit, publication_type, start, end,
                                                 db)
    return articles


@router.get("/names/")
async def get_names_article(search: str, db: orm.Session = Depends(get_db)):
    articles = await controller_get_articles_by_name(search, db)
    return articles


@router.get('/{id}')
async def get_current_article(id: int, db: orm.Session = Depends(get_db)):
    result = await controller_get_article_by_id(id, db)
    return result


@router.delete("/{id}")
async def delete_article(id: int, role_access: bool = Depends(operator_role),
                         db: orm.Session = Depends(get_db)):
    await controller_delete_article_by_id(id, role_access, db)


@router.patch("/{id}")
async def update_parameter_article(id: int, article: SchemeArticleUpdate, role_access: bool = Depends(operator_role),
                                   db: orm.Session = Depends(get_db)):
    result = await controller_update_parameter_article(id, article, role_access, db)
    return result


@router.put("/{id}")
async def update_article(id: int, db: orm.Session = Depends(get_db)):
    pass


@router.get("/authors/")
async def get_article_by_author_name(user: str, db: orm.Session = Depends(get_db)):
    result = await controller_get_articles_by_author_name(user, db)
    return result


@router.get("/document_type/values")
async def get_document_types(db: orm.Session = Depends(get_db)):
    result = await controller_get_document_types(db)
    return result
