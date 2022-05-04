from datetime import date

from fastapi import HTTPException, status
from sqlalchemy import orm

from src.database.db_model import UnverifiedArticles, Users, ArticlesInformation, Articles, DocumentTypes, \
    VerificationArticles, Bibliography, Quartiles, Authors
from src.scheme.scheme_article import SchemeArticleCreate


async def service_get_not_confirm_article(db: orm.Session):
    unverified_articles = db.query(UnverifiedArticles).filter(UnverifiedArticles.status == "1").all()
    if not unverified_articles:
        return None
    result = []
    for i in unverified_articles:
        item = db.query(Users).filter(Users.user_id == i.user_id).first()
        result.append(dict(
            article_id=i.unverified_article_id,
            author_id=item.user_id,
            email=item.email,
            phone=item.phone,
            name=f"{item.surname} {item.name} {item.patronymic}",
            link=i.link
        ))

    return result


async def service_find_article_by_doi(doi: str, db: orm.Session):
    result = db.query(ArticlesInformation).filter(ArticlesInformation.doi == doi).first()
    return result


async def service_find_article_by_edn(edn: str, db: orm.Session):
    result = db.query(ArticlesInformation).filter(ArticlesInformation.edn == edn).first()
    return result


async def service_find_article_by_title(title: str, db: orm.Session):
    result = db.query(Articles).filter(Articles.title == title).first()
    return result


async def service_find_document_type(name: str, db: orm.Session):
    result = db.query(DocumentTypes).filter(DocumentTypes.name == name.lower()).first()
    return result


async def service_add_new_article(article: SchemeArticleCreate, user_id: int, db: orm.Session):
    get_document_type = db.query(DocumentTypes).filter(DocumentTypes.name == article.document_type.lower()).first()
    if not get_document_type:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Document type not found")
    user = db.query(Users.name, Users.surname, Users.patronymic).filter(Users.user_id == user_id).first()
    article_info = ArticlesInformation(
        doi=article.doi,
        key_words=article.key_words,
        edn=article.edn,
        annotation=article.annotation,
        is_vak=article.is_vak,
        affiliation=article.affiliations
    )
    verification = VerificationArticles(
        name=f"{user.surname} {user.name} {user.patronymic}",
        date=date.today().strftime("%d/%m/%Y"),
        status=True
    )
    bibliography = Bibliography(
        wos=(True if article.wos == "Да" else False),
        scopus=(True if article.scopus == "Да" else False),
        rinz=(True if article.rinz == "Да" else False)
    )
    quartiles = Quartiles(
        snip=article.snip,
        jif=article.jif,
        csp=article.cite_score_percentile,
        sjr=article.sjr
    )
    article = Articles(
        title=article.title.lower(),
        source=article.source,
        authors=article.authors,
        link=article.link,
        document_type_id=get_document_type.document_type_id,
        publication_date=int(article.publication_date),
        article_information=article_info,
        verification_article=verification,
        bibliography=bibliography,
        quartiles=quartiles
    )
    db.add(article)
    db.commit()
    db.refresh(article)
    return article


async def service_article_confirm(author_id: int, article_id: int, unverified_article_id: int, db: orm.Session):
    author = Authors(
        user_id=author_id,
        article_id=article_id
    )
    unverified_article = db.query(UnverifiedArticles).filter(
        UnverifiedArticles.unverified_article_id == unverified_article_id).first()
    unverified_article.status = "2",
    db.add(author)
    db.commit()
    db.refresh(author)
    db.refresh(unverified_article)
    return dict(status=200, detail="Create")


async def service_rejection_article(article_id, detail: str | None, db: orm.Session):
    unverified_article = db.query(UnverifiedArticles).filter(
        UnverifiedArticles.unverified_article_id == article_id).first()
    unverified_article.status = "3",
    unverified_article.detail = detail
    db.commit()
    db.refresh(unverified_article)
    return dict(status=200, detail="Update")


async def service_get_unverified_article_by_id(article_id, db: orm.Session):
    result = db.query(UnverifiedArticles).filter(UnverifiedArticles.unverified_article_id == article_id).first()
    return result
