from datetime import date
from datetime import datetime
import passlib.hash as _hash
from sqlalchemy import orm

from settings_env import USER
from src.database.db_model import Users, Workplaces, Indicators, UnverifiedArticles, ResearchAreas, Authors, \
    Universities, Institutes, Faculties, Departments, Articles
from src.scheme.scheme_indicators import SchemeIndicators
from src.scheme.scheme_user import SchemeUserCreate, SchemeUser


async def service_get_user_by_email(email: str, db: orm.Session):
    return db.query(Users).filter(Users.email == email).first()


async def service_get_user_by_id(user_id: int, db: orm.Session):
    return db.query(Users).filter(Users.user_id == user_id).first()


async def service_create_new_user(user: SchemeUserCreate, db: orm.Session):
    new_user = Users(
        email=user.email,
        name=user.name,
        surname=user.surname,
        patronymic=user.patronymic,
        password=_hash.bcrypt.hash(user.hashed_password),
        phone=user.phone.replace(' ', ''),
        registration_date=date.today().strftime("%d/%m/%Y"),
        role_id=int(USER)
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    new_user_init_indicators = Indicators(
        user_id=new_user.user_id
    )

    db.add(new_user_init_indicators)
    db.commit()
    db.refresh(new_user_init_indicators)

    return new_user


async def service_delete_me(user_id: int, db: orm.Session):
    user = db.query(Users).filter(Users.user_id == user_id).first()
    db.delete(user)
    db.commit()
    return "ok"


async def service_get_user_workplaces(user_id: int, db: orm.Session):
    try:
        workplaces = db.query(Workplaces).filter(Workplaces.user_id == user_id).all()
    except:
        workplaces = None
    result = [{'university': i.university, 'institute': i.institute, 'faculty': i.faculty, 'department': i.department,
               'position': i.position} for i in workplaces]
    return result


async def service_get_user_indicators(user_id: int, db: orm.Session):
    indicators = db.query(Indicators).filter(Indicators.user_id == user_id).first()
    return indicators


async def service_add_user_indicators(user_id: int, indicators: SchemeIndicators, db: orm.Session):
    user_indicators = Indicators(
        scopus=indicators.scopus,
        wos=indicators.wos,
        orcid=indicators.orcid,
        elibrary=indicators.elibrary,
        pilons=indicators.publons,
        user_id=user_id
    )
    db.add(user_indicators)
    db.commit()
    db.refresh(user_indicators)
    return user_indicators


async def service_update_user_indicators(indicators: SchemeIndicators, db: orm.Session, user: SchemeUser):
    get_user = db.query(Users).filter(Users.user_id == user.user_id).first()
    get_indicators = get_user.indicators
    for key, value in indicators.dict().items():
        if value:
            setattr(get_indicators, key, value)
    db.commit()
    db.refresh(get_indicators)
    return get_indicators


async def service_add_new_article_check(link: str, user_id: int, db: orm.Session):
    new_article = UnverifiedArticles(
        link=link,
        status=1,
        user_id=user_id,
    )
    db.add(new_article)
    db.commit()
    db.refresh(new_article)
    return dict(status_code=200, detail="Ok")


async def service_get_unverified_articles_by_user(user_id: int, db: orm.Session):
    result = db.query(UnverifiedArticles).filter(UnverifiedArticles.user_id == user_id).all()
    return result


async def service_delete_unverified_articles_by_id(unverified_article_id: int, db: orm.Session):
    article = db.query(UnverifiedArticles).filter(
        UnverifiedArticles.unverified_article_id == unverified_article_id).first()
    db.delete(article)
    db.commit()
    return dict(status_code=200, detail="Deleted")


async def service_add_research_field(field: str, user_id: int, db: orm.Session):
    research_area = ResearchAreas(
        name=field,
        user_id=user_id
    )
    db.add(research_area)
    db.commit()
    db.refresh(research_area)
    research_areas = db.query(ResearchAreas).filter(ResearchAreas.user_id == user_id).all()
    return research_areas


async def service_get_research_fields_by_user_id(user_id, db):
    research_areas = db.query(ResearchAreas).filter(ResearchAreas.user_id == user_id).all()
    return research_areas


async def service_get_current_research_field(id: int, db: orm.Session):
    research_field = db.query(ResearchAreas).filter(ResearchAreas.research_areas_id == id).first()
    return research_field


async def service_delete_research_field(id: int, user_id, db: orm.Session):
    research_field = db.query(ResearchAreas).filter(ResearchAreas.research_areas_id == id).first()
    db.delete(research_field)
    db.commit()
    research_areas = db.query(ResearchAreas).filter(ResearchAreas.user_id == user_id).all()
    return research_areas


async def service_get_authors_by_name(search: str, db: orm.Session):
    split_search = search.split()
    result = []
    for i in split_search:
        result.append(db.query(Users.name, Users.surname, Users.patronymic, Users.user_id).filter(
            Users.name.ilike('%' + i + '%') | Users.surname.ilike('%' + i + '%') | Users.patronymic.ilike('%' + i + '%')
        ).limit(5))
    return_result = []
    for i in result:
        for j in i:
            if j.patronymic:
                return_result.append({'id': j.user_id, 'label': f"{j.surname} {j.name} {j.patronymic}"})
            else:
                return_result.append({'id': j.user_id, 'label': f"{j.surname} {j.name}"})
    return return_result


async def service_get_user_articles(id: int, db: orm.Session):
    result = db.query(Authors).filter(Authors.user_id == id).all()
    value_publication = len(result)
    publication = [i.article for i in result]
    return dict(value=value_publication, data=publication)


async def service_get_all_employees(query, db: orm.Session):
    result = []
    employees = db.query(Users).filter(
        Users.name.ilike('%' + (query if query else "") + '%') |
        Users.surname.ilike('%' + (query if query else "") + '%') |
        Users.patronymic.ilike('%' + (query if query else "") + '%')
    ).all()
    for employee in employees:
        number_publication = len(employee.author)
        if employee.patronymic:
            name = f"{employee.surname} {employee.name} {employee.patronymic}"
        else:
            name = f"{employee.surname} {employee.name}"
        result.append(dict(id=employee.user_id, name=name, publication=number_publication))
    return result


async def service_delete_article_by_id(id: int, user_id: int, db: orm.Session):
    confirm_article = db.query(Authors).filter(Authors.user_id == user_id, Authors.article_id == id).first()
    db.delete(confirm_article)
    db.commit()
    return dict(status="200")


async def service_get_all_university_units(db: orm.Session):
    universities = [{'id': i.university_id, 'label': i.name} for i in db.query(Universities).all()]
    institutes = [{'id': i.institute_id, 'label': i.name} for i in db.query(Institutes).all()]
    faculties = [{'id': i.faculty_id, 'label': i.name} for i in db.query(Faculties).all()]
    departments = [{'id': i.department_id, 'label': i.name} for i in db.query(Departments).all()]
    return dict(universities=universities, institutes=institutes, faculties=faculties, departments=departments)


async def service_get_user_by_phone(phone: str, db: orm.Session):
    return db.query(Users).filter(Users.phone == phone).first()


async def service_get_basic_statistic(id: int, db: orm.Session):
    user = db.query(Users).filter(Users.user_id == id).first()
    publication = len(user.author)
    article = len([i for i in user.author if i.article.document_type.name == "article"])
    review = len([i for i in user.author if i.article.document_type.name == "review"])
    return dict(publication=publication, article=article, review=review)


async def service_get_summary_statistic(id: int, db: orm.Session):
    articles = db.query(Users).filter(Users.user_id == id).first().author
    result = []
    for i in range(datetime.now().year - 6, datetime.now().year + 1):
        count = 0
        for j in articles:
            if i == j.article.publication_date:
                count += 1
        result.append({"name": i, "Публикаций": count})
    return result


async def service_get_graph(id: int, db: orm.Session):
    articles = db.query(Users).filter(Users.user_id == id).first().author
    get_author_name = db.query(Users.name, Users.surname)
    result = []
    for i in articles:
        result.append(i.article.authors.split(', '))
    result = list(set(result))


async def service_get_all_by_department(query: str, db: orm.Session):
    result = []
    departments = db.query(Departments).filter(Departments.name.ilike('%' + (query if query else "") + '%')).all()
    id = 1
    for department in departments:
        publication = 0
        employee = []
        for workplace in department.workplace:
            publication += len(workplace.user.author)
            employee.append(workplace.user)
        result.append(
            {
                "id": id,
                "department_id": department.department_id,
                "department": department.name,
                "publication": publication,
                "employee": len(list(set(employee)))
            }
        )
        id += 1
    return result


async def service_get_all_by_faculty(query: str, db: orm.Session):
    result = []
    id = 1
    faculties = db.query(Faculties).filter(Faculties.name.ilike('%' + (query if query else "") + '%')).all()
    for faculty in faculties:
        publication = 0
        employee = []
        for workplace in faculty.workplace:
            publication += len(workplace.user.author)
            employee.append(workplace.user)
        result.append(
            {
                "id": id,
                "faculty_id": faculty.faculty_id,
                "faculty": faculty.name,
                "publication": publication,
                "employee": len(list(set(employee)))
            }
        )
        id += 1
    return result
