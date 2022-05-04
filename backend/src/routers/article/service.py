import datetime

from sqlalchemy import orm

from src.database.db_model import Articles, DocumentTypes, ArticlesInformation, Authors
from src.scheme.scheme_article import SchemeArticleViewForNewAuthor, SchemeArticleView, SchemeArticleViewInfo, \
    SchemeArticleUpdate


async def service_get_articles_by_author_name(name: str, db: orm.Session):
    result = db.query(Articles).filter(Articles.authors.like("%" + name + "%")).all()
    list_article = [SchemeArticleViewForNewAuthor.from_orm(i) for i in result]
    return list_article


async def service_get_all_articles_by_fields(search: str, page: int, limit: int, publication_type: str,
                                             start: str, end: str,  db: orm.Session):
    type = db.query(DocumentTypes).filter(DocumentTypes.name == publication_type.lower()).first()
    articles = db.query(Articles).filter(
        Articles.title.like('%' + (search.lower() if search else "") + '%'),
        (Articles.document_type_id == type.document_type_id if type else Articles.document_type_id is not None),
        Articles.publication_date <= int(end if end else datetime.datetime.now().year),
        Articles.publication_date >= int(start if start else 1960)
    )
    len_articles = len(articles.all())
    articles = articles.offset(page).limit(limit).all()
    value = int(len_articles / limit) + 1
    return dict(articles=articles, value=value, page=page)


async def service_get_document_types(db: orm.Session):
    result = db.query(DocumentTypes).all()
    return_result = []
    for i in result:
        return_result.append(dict(id=i.document_type_id, label=i.name.title()))
    return return_result


async def service_get_all_articles(page: int, limit: int, db: orm.Session):
    all_articles = db.query(Articles).count()
    articles = db.query(Articles).offset(page).limit(limit).all()
    value = int(all_articles / limit) + 1
    return dict(articles=articles, value=value, page=page)


async def service_get_article_by_id(id: int, db: orm.Session):
    article_query = db.query(Articles).filter(Articles.article_id == id).first()
    if not article_query:
        return None
    article = SchemeArticleView.from_orm(article_query)
    article_information = SchemeArticleViewInfo.from_orm(article_query.article_information)
    article_document_type = article_query.document_type.name
    return dict(base=article, information=article_information, type=article_document_type)


async def service_update_parameter_article(id: int, article: SchemeArticleUpdate, db: orm.Session):
    article_update = db.query(Articles).filter(Articles.article_id == id).first()
    bibliography_elements = ("wos", "scopus", "rinz")
    quartiles_elements = ("cite_score_percentile", "jif", "sjr", "snip")
    basic_element = ("title", "source", "authors", "publication_date", "link")
    addition_elements = ("doi", "edn", "key_words", "affiliations", "annotation")
    types = "document_type"
    for key, value in article.dict().items():
        if value and key in bibliography_elements:
            value = True if value == "Да" else False
            setattr(article_update.bibliography, key, value)
        elif value and key in quartiles_elements:
            setattr(article_update.quartiles, key, value)
        elif value and key in basic_element:
            setattr(article_update, key, value)
        elif value and key in addition_elements:
            setattr(article_update.article_information, key, value)
        elif value and key == types:
            type_id = db.query(DocumentTypes).filter(DocumentTypes.name == value.lower()).first()
            article_update.document_type_id = type_id.document_type_id
    db.commit()
    db.refresh(article_update)
    return article_update


async def service_get_articles_by_name(search: str, db: orm.Session):
    result = db.query(Articles.title, Articles.article_id).filter(
        Articles.title.like('%' + search.lower() + '%')).limit(5)
    return_result = []
    for i in result:
        return_result.append({'id': i.article_id, 'label': i.title})
    return return_result


async def service_delete_article_by_id(id: int, db: orm.Session):
    article = db.query(Articles).filter(Articles.article_id == id).first()
    db.delete(article.author)
    db.delete(article.article_information)
    db.delete(article.bibliography)
    db.delete(article.verification_article)
    db.delete(article)
    db.commit()

