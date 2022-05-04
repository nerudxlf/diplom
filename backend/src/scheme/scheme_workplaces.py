import pydantic as _pydantic


class SchemeWorkplacesCreate(_pydantic.BaseModel):
    university: str | None = None  # University
    institute: str | None = None  # Institute
    faculty: str | None = None  # Basic department or faculty
    department: str | None = None  # Department
    position: str | None = None


class SchemeWorkplacesReturn(SchemeWorkplacesCreate):
    workplace_id: int | None = None



