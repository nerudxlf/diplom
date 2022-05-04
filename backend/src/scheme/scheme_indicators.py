import pydantic as _pydantic


class SchemeIndicators(_pydantic.BaseModel):
    scopus: str | None = None
    wos: str | None = None
    orcid: str | None = None
    elibrary: str | None = None
    publons: str | None = None

    class Config:
        orm_mode = True
