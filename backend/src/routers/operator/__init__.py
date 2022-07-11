from fastapi import APIRouter, Depends, UploadFile
from sqlalchemy import orm

from src.chekers.roles import RolesChecker
from src.database.db_connect import get_db
from src.routers.operator.controller import controller_get_not_confirm_articles, controller_upload_file, \
    controller_add_new_article, controller_upload_dataset, controller_article_confirm, controller_rejection_article
from src.routers.user import controller_get_current_user
from src.scheme.scheme_article import SchemeArticleCreate
from src.scheme.scheme_user import SchemeUser

router = APIRouter(
    prefix="/api/operator",
    tags=["operator"],
    responses={404: {"description": "Not found"}}
)

operator_role = RolesChecker([3])


@router.post("/confirm_article/")
async def confirm_article(
        author_id: int,
        article_id: int,
        unverified_article_id: int,
        db: orm.Session = Depends(get_db),
        role_access: bool = Depends(operator_role)
):
    """
    Confirmed Article
    :param author_id: User ID
    :param article_id: Article ID
    :param unverified_article_id: Unverified Article ID
    :param db: Current db Session
    :param role_access: Current user role
    :return:
    """
    result = await controller_article_confirm(author_id, article_id, unverified_article_id, db, role_access)
    return result


@router.post("/rejection_article/")
async def rejection_article(article_id: int, detail: str | None, role_access: bool = Depends(operator_role),
                            db: orm.Session = Depends(get_db)):
    """

    :param article_id:
    :param detail:
    :param role_access:
    :param db:
    :return:
    """
    result = await controller_rejection_article(article_id, detail, role_access, db)
    return result


@router.post("/upload_file")
async def upload_file(file: UploadFile, role_access: bool = Depends(operator_role)):

    result = await controller_upload_file(file, role_access)
    return result


@router.post("/upload_dataset")
async def upload_dataset(
        articles: list[SchemeArticleCreate],
        db: orm.Session = Depends(get_db),
        role_access: bool = Depends(operator_role),
        user: SchemeUser = Depends(controller_get_current_user)
):
    """
    Uploaded Data Set
    :param articles: List Articles
    :param db: Current db Session
    :param role_access: Current user Role
    :param user: Current user
    :return:
    """
    result = await controller_upload_dataset(articles, user, role_access, db)
    return result


@router.get("/articles")
async def get_not_confirm_articles(db: orm.Session = Depends(get_db), role_access: bool = Depends(operator_role)):
    """
    Getting not confirmed articles
    :param db: Current db Session
    :param role_access: Current user Role
    :return:
    """
    result = await controller_get_not_confirm_articles(role_access, db)
    return result


@router.post("/articles")
async def add_new_article(
        article: SchemeArticleCreate,
        db: orm.Session = Depends(get_db),
        role_access: bool = Depends(operator_role),
        user: SchemeUser = Depends(controller_get_current_user)
):
    """
    Added new article
    :param article: Scheme Article Create
    :param db: Current db Session
    :param role_access: Current user Role
    :param user: Current user
    :return:
    """
    result = await controller_add_new_article(article, user, role_access, db)
    return result
