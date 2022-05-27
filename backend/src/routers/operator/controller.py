from fastapi import HTTPException, status, UploadFile
from sqlalchemy import orm

from src.routers.operator.pandas_service import service_view_data_from_file
from src.routers.operator.service import service_get_not_confirm_article, service_find_article_by_doi, \
    service_find_article_by_edn, service_find_article_by_title, service_add_new_article, service_find_document_type, \
    service_article_confirm, service_rejection_article, service_get_unverified_article_by_id
from src.scheme.scheme_article import SchemeArticleCreate
from src.scheme.scheme_user import SchemeUser


async def controller_get_not_confirm_articles(role_access: bool, db: orm.Session):
    if not role_access:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    result = await service_get_not_confirm_article(db)
    return result


async def controller_upload_file(file: UploadFile, role_access: bool):
    if not role_access:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    ext = file.filename.split(".")[-1]
    if ext != "xlsx" and ext != "xls":
        raise HTTPException(status_code=status.HTTP_409_CONFLICT)
    result = await service_view_data_from_file(file)
    return result


async def controller_add_new_article(article: SchemeArticleCreate, user: SchemeUser, role_access: bool,
                                     db: orm.Session):
    if not role_access:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    article_by_title = await service_find_article_by_title(article.title, db)
    if article_by_title:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Такая статья уже существует")
    document_type = await service_find_document_type(article.document_type, db)
    if not document_type:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Document type не найден")
    if article.doi:
        article_by_doi = await service_find_article_by_doi(article.doi, db)
        if article_by_doi:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Такая статья уже существует")
    elif article.edn:
        article_by_edn = await service_find_article_by_edn(article.edn, db)
        if article_by_edn:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Такая статья уже существует")
    if not isinstance(article.snip, int) or 0 == article.sjr > 5:
        article.snip = None
    if not isinstance(article.jif, int) or 0 == article.sjr > 5:
        article.jif = None
    if not isinstance(article.sjr, int) or 0 == article.sjr > 5:
        article.sjr = None
    if not isinstance(article.cite_score_percentile, int) or 0 == article.sjr > 5:
        article.cite_score_percentile = None
    result = await service_add_new_article(article, user.user_id, db)
    return result


async def controller_upload_dataset(articles: list[SchemeArticleCreate], user: SchemeUser, role_access: bool,
                                    db: orm.Session):
    if not role_access:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    error_article = []
    for article in articles:
        article_by_title = await service_find_article_by_title(article.title, db)
        if article_by_title:
            error_article.append(dict(name=article.title, detail="Такая статья уже существует"))
            continue
        document_type = await service_find_document_type(article.document_type, db)
        if not document_type:
            error_article.append(dict(name=article.title, detail="Такой категории нет"))
            continue
        if article.doi:
            article_by_doi = await service_find_article_by_doi(article.doi, db)
            if article_by_doi:
                error_article.append(dict(name=article.title, detail="Такая статья уже существует"))
                continue
        if article.edn:
            article_by_edn = await service_find_article_by_edn(article.edn, db)
            if article_by_edn:
                error_article.append(dict(name=article.title, detail="Такая статья уже существует"))
                continue
        await service_add_new_article(article, user.user_id, db)
    return error_article


async def controller_article_confirm(author_id: int, article_id: int, unverified_article_id: int, db: orm.Session,
                                     role_access: bool):
    if not role_access:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    result = await service_article_confirm(author_id, article_id, unverified_article_id, db)
    return result


async def controller_rejection_article(article_id: int, detail: str | None, role_access: bool, db: orm.Session):
    if not role_access:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    unverified_article = await service_get_unverified_article_by_id(article_id, db)
    if not role_access:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
    result = await service_rejection_article(article_id, detail, db)
    return result
