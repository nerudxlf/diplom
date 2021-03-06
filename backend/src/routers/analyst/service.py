from sqlalchemy import orm

from src.database.db_model import Articles, DocumentTypes, Users


async def service_count_all_publications(db: orm.Session):
    value = db.query(Articles).count()
    return value


async def service_count_article(db: orm.Session):
    article = db.query(DocumentTypes).filter(DocumentTypes.name == "article").first()
    result = db.query(Articles).filter(Articles.document_type_id == article.document_type_id).count()
    return result


async def service_count_review(db: orm.Session):
    review = db.query(DocumentTypes).filter(DocumentTypes.name == "review").first()
    result = db.query(Articles).filter(Articles.document_type_id == review.document_type_id).count()
    return result


async def service_count_publications_by_year(years_range: list[str], db: orm.Session):
    result_list = []
    for year in years_range:
        number = len(db.query(Articles).filter(Articles.publication_date == year).all())
        result_list.append({"name": year, "value": number})
    return result_list


async def service_count_authors(db: orm.Session):
    ...


async def service_get_analysis_authors(db: orm.Session):
    result = []
    users = db.query(Users).all()
    for user in users:
        result.append({
            "id": user.user_id,
            "name": f"{user.name} {user.surname}{' ' + user.patronymic if user.patronymic else ''}",
            "email": user.email,
            "department":  user.workplace[0].department.name if user.workplace else None,
            "publication": len(user.author),
            "article": len([i for i in user.author if i.article.document_type.name == "article"]),
            "review": len([i for i in user.author if i.article.document_type.name == "review"]),
        })
    return result


async def service_get_analysis_articles(db: orm.Session):
    result = []
    articles = db.query(Articles).all()
    for article in articles:
        result.append({
            "id": article.article_id,
            "title": article.title,
            "link": article.link,
            "date": article.publication_date,
            "doi": article.article_information.doi,
            "sjr": article.quartiles.sjr,
            "snip": article.quartiles.snip,
            "jif": article.quartiles.jif,
            "csp": article.quartiles.csp,
        })
    return result


async def service_get_number_of_authors(db: orm.Session):
    return db.query(Users).count()


async def service_get_publication_by_type(db: orm.Session):
    article = len(db.query(DocumentTypes).filter(DocumentTypes.name == "article").first().article)
    review = len(db.query(DocumentTypes).filter(DocumentTypes.name == "review").first().article)
    conference_paper = len(db.query(DocumentTypes).filter(DocumentTypes.name == "conference paper").first().article)
    note = len(db.query(DocumentTypes).filter(DocumentTypes.name == "note").first().article)
    data_paper = len(db.query(DocumentTypes).filter(DocumentTypes.name == "data paper").first().article)
    book_chapter = len(db.query(DocumentTypes).filter(DocumentTypes.name == "book chapter").first().article)
    result = [
        {"name": "article", "value": article},
        {"name": "review", "value": review},
        {"name": "conference paper", "value": conference_paper},
        {"name": "note", "value": note},
        {"name": "data paper", "value": data_paper},
        {"name": "book chapter", "value": book_chapter},
    ]
    return result
