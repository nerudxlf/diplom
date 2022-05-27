import passlib.hash as _hash
import sqlalchemy as _sql
import sqlalchemy.orm as _orm

from src.database import db_connect


class Users(db_connect.Base):
    __tablename__: str = "users"
    user_id = _sql.Column(_sql.Integer, primary_key=True, index=True)
    name = _sql.Column(_sql.String)
    surname = _sql.Column(_sql.String)
    patronymic = _sql.Column(_sql.String)
    email = _sql.Column(_sql.String, unique=True, index=True)
    phone = _sql.Column(_sql.String, unique=True)
    password = _sql.Column(_sql.String)
    registration_date = _sql.Column(_sql.Date)
    role_id = _sql.Column(_sql.Integer, _sql.ForeignKey('roles.role_id'))
    role = _orm.relationship('Roles', back_populates="user")
    image_id = _sql.Column(_sql.Integer, _sql.ForeignKey('images.image_id'))
    image = _orm.relationship('Images')
    indicators = _orm.relationship('Indicators', back_populates="user", uselist=False)
    author = _orm.relationship('Authors', back_populates="user")
    workplace = _orm.relationship('Workplaces', back_populates="user")

    def verify_password(self, password: str):
        return _hash.bcrypt.verify(password, self.password)


class Roles(db_connect.Base):
    __tablename__: str = "roles"
    role_id = _sql.Column(_sql.Integer, primary_key=True, index=True)
    user = _orm.relationship('Users', back_populates="role")
    name = _sql.Column(_sql.String)


class ResearchAreas(db_connect.Base):
    __tablename__: str = "research_areas"
    research_areas_id = _sql.Column(_sql.Integer, primary_key=True, index=True)
    name = _sql.Column(_sql.String)
    user_id = _sql.Column(_sql.Integer, _sql.ForeignKey('users.user_id'))
    user = _orm.relationship('Users')


class Universities(db_connect.Base):
    __tablename__: str = "universities"
    university_id = _sql.Column(_sql.Integer, primary_key=True, index=True)
    name = _sql.Column(_sql.String, nullable=False, unique=True)
    workplace = _orm.relationship('Workplaces', back_populates="university")


class Institutes(db_connect.Base):
    __tablename__: str = "institutes"
    institute_id = _sql.Column(_sql.Integer, primary_key=True, index=True)
    name = _sql.Column(_sql.String, nullable=False, unique=True)
    workplace = _orm.relationship('Workplaces', back_populates="institute")


class Faculties(db_connect.Base):
    __tablename__: str = "faculties"
    faculty_id = _sql.Column(_sql.Integer, primary_key=True, index=True)
    name = _sql.Column(_sql.String, nullable=False, unique=True)
    workplace = _orm.relationship('Workplaces', back_populates="faculty")


class Departments(db_connect.Base):
    __tablename__: str = "departments"
    department_id = _sql.Column(_sql.Integer, primary_key=True, index=True)
    name = _sql.Column(_sql.String, nullable=False, unique=True)
    workplace = _orm.relationship('Workplaces', back_populates="department")


class Workplaces(db_connect.Base):
    __tablename__: str = "workplaces"
    workplace_id = _sql.Column(_sql.Integer, primary_key=True, index=True)
    university_id = _sql.Column(_sql.Integer, _sql.ForeignKey('universities.university_id'))
    university = _orm.relationship("Universities", back_populates="workplace")
    institute_id = _sql.Column(_sql.Integer, _sql.ForeignKey('institutes.institute_id'))
    institute = _orm.relationship("Institutes", back_populates="workplace")
    faculty_id = _sql.Column(_sql.Integer, _sql.ForeignKey('faculties.faculty_id'))
    faculty = _orm.relationship("Faculties", back_populates="workplace")
    department_id = _sql.Column(_sql.Integer, _sql.ForeignKey('departments.department_id'))
    department = _orm.relationship("Departments", back_populates="workplace")
    position = _sql.Column(_sql.String, )
    user_id = _sql.Column(_sql.Integer, _sql.ForeignKey('users.user_id'))
    user = _orm.relationship("Users", back_populates="workplace")


class Images(db_connect.Base):
    __tablename__: str = "images"
    image_id = _sql.Column(_sql.Integer, primary_key=True, index=True)
    src = _sql.Column(_sql.String)


class Indicators(db_connect.Base):
    __tablename__: str = "indicators"
    indicator_id = _sql.Column(_sql.Integer, primary_key=True, index=True)
    scopus = _sql.Column(_sql.String, unique=True)
    wos = _sql.Column(_sql.String, unique=True)
    orcid = _sql.Column(_sql.String, unique=True)
    elibrary = _sql.Column(_sql.String, unique=True)
    publons = _sql.Column(_sql.String, unique=True)
    user_id = _sql.Column(_sql.Integer, _sql.ForeignKey('users.user_id'))
    user = _orm.relationship("Users", back_populates="indicators")


class ArticlesInformation(db_connect.Base):
    __tablename__: str = "articles_information"
    article_information_id = _sql.Column(_sql.Integer, primary_key=True, index=True)
    doi = _sql.Column(_sql.String)
    key_words = _sql.Column(_sql.String)
    edn = _sql.Column(_sql.String)
    annotation = _sql.Column(_sql.String)
    is_vak = _sql.Column(_sql.Boolean)
    affiliation = _sql.Column(_sql.String)
    article = _orm.relationship('Articles', back_populates='article_information')


class DocumentTypes(db_connect.Base):
    __tablename__: str = "document_types"
    document_type_id = _sql.Column(_sql.Integer, primary_key=True, index=True)
    name = _sql.Column(_sql.String)
    article = _orm.relationship('Articles', back_populates="document_type")


class Articles(db_connect.Base):
    __tablename__: str = "articles"
    article_id = _sql.Column(_sql.Integer, primary_key=True, index=True)
    title = _sql.Column(_sql.String, nullable=False)
    source = _sql.Column(_sql.String, nullable=False)
    authors = _sql.Column(_sql.String, nullable=False)
    link = _sql.Column(_sql.String, nullable=False)
    publication_date = _sql.Column(_sql.Integer, nullable=False)
    verification_article_id = _sql.Column(_sql.Integer,
                                          _sql.ForeignKey('verification_articles.verification_article_id'))
    verification_article = _orm.relationship('VerificationArticles', back_populates="article")

    document_type_id = _sql.Column(_sql.Integer, _sql.ForeignKey('document_types.document_type_id'))
    document_type = _orm.relationship('DocumentTypes', back_populates="article", uselist=False)

    article_information_id = _sql.Column(_sql.Integer, _sql.ForeignKey('articles_information.article_information_id'))
    article_information = _orm.relationship('ArticlesInformation', back_populates="article", uselist=False)

    quartiles_id = _sql.Column(_sql.Integer, _sql.ForeignKey('quartiles.quartile_id'))
    quartiles = _orm.relationship('Quartiles', back_populates='article', uselist=False)

    bibliography_id = _sql.Column(_sql.Integer, _sql.ForeignKey('bibliography.bibliography_id'))
    bibliography = _orm.relationship('Bibliography', back_populates='article', uselist=False)

    author = _orm.relationship('Authors', back_populates='article')


class VerificationArticles(db_connect.Base):
    __tablename__: str = "verification_articles"
    verification_article_id = _sql.Column(_sql.Integer, primary_key=True, index=True)
    name = _sql.Column(_sql.String)
    date = _sql.Column(_sql.Date)
    status = _sql.Column(_sql.Boolean)
    article = _orm.relationship('Articles', back_populates="verification_article")


class Quartiles(db_connect.Base):
    __tablename__: str = "quartiles"
    quartile_id = _sql.Column(_sql.Integer, primary_key=True, index=True)
    snip = _sql.Column(_sql.Integer)
    jif = _sql.Column(_sql.Integer)
    csp = _sql.Column(_sql.Integer)
    sjr = _sql.Column(_sql.Integer)
    article = _orm.relationship('Articles', back_populates='quartiles')


class Bibliography(db_connect.Base):
    __tablename__: str = "bibliography"
    bibliography_id = _sql.Column(_sql.Integer, primary_key=True, index=True)
    wos = _sql.Column(_sql.Boolean)
    scopus = _sql.Column(_sql.Boolean)
    rinz = _sql.Column(_sql.Boolean)
    article = _orm.relationship('Articles', back_populates='bibliography')


class Authors(db_connect.Base):
    __tablename__: str = "authors"
    author_id = _sql.Column(_sql.Integer, primary_key=True, index=True)
    article_id = _sql.Column(_sql.Integer, _sql.ForeignKey('articles.article_id'))
    article = _orm.relationship('Articles', back_populates='author')
    user_id = _sql.Column(_sql.Integer, _sql.ForeignKey('users.user_id'))
    user = _orm.relationship("Users", back_populates='author')


class UnverifiedArticles(db_connect.Base):
    __tablename__: str = "unverified_articles"
    unverified_article_id = _sql.Column(_sql.Integer, primary_key=True, index=True)
    link = _sql.Column(_sql.String, nullable=False)
    status = _sql.Column(_sql.Integer, nullable=False)
    detail = _sql.Column(_sql.String)
    user_id = _sql.Column(_sql.Integer, _sql.ForeignKey('users.user_id'))
    user = _orm.relationship("Users")
