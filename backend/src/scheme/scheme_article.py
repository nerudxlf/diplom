import pydantic as _pydantic


class _SchemeArticleBase(_pydantic.BaseModel):
    title: str


class SchemeArticleCreate(_SchemeArticleBase):
    source: str
    authors: str
    publication_date: int
    key_words: str | None = None
    affiliations: str | None = None
    document_type: str
    doi: str | None = None
    annotation: str | None = None
    link: str
    wos: str | None = None
    scopus: str | None = None
    rinz: str | None = None
    edn: str | None = None
    snip: int | None | str = None
    jif: int | None | str = None
    cite_score_percentile: int | None | str = None
    sjr: int | None | str = None
    is_vak: bool | None = None


class SchemeArticleViewForNewAuthor(_SchemeArticleBase):
    articles_id: int
    source: str
    authors: str
    link: str
    publication_date: str

    class Config:
        orm_mode = True


class SchemeArticleView(_SchemeArticleBase):
    source: str
    authors: str
    link: str
    publication_date: int

    class Config:
        orm_mode = True


class SchemeArticleViewInfo(_pydantic.BaseModel):
    doi: str | None
    key_words: str | None
    edn: str | None
    annotation: str | None
    isVak: bool | None
    affiliation: str | None

    class Config:
        orm_mode = True


class SchemeArticleUpdate(_pydantic.BaseModel):
    title: str | None = None
    source: str | None = None
    authors: str | None = None
    publication_date: int | None = None
    key_words: str | None = None
    affiliations: str | None = None
    document_type: str | None = None
    doi: str | None = None
    annotation: str | None = None
    link: str | None = None
    wos: str | None = None
    scopus: str | None = None
    rinz: str | None = None
    edn: str | None = None
    snip: int | None | str = None
    jif: int | None | str = None
    cite_score_percentile: int | None | str = None
    sjr: int | None | str = None
    isVak: bool | None | str = None

