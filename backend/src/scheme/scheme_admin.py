import pydantic as _pydantic


class SchemeChangeRole(_pydantic.BaseModel):
    id: int
    role: str
