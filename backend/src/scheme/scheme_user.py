import pydantic as _pydantic


class _SchemeUserBase(_pydantic.BaseModel):
    email: str


class SchemeUserCreate(_SchemeUserBase):
    hashed_password: str
    name: str
    surname: str
    patronymic: str
    phone: str

    class Config:
        orm_mode = True


class SchemeUserUpdate(_SchemeUserBase):
    hashed_password: str
    name: str
    surname: str
    patronymic: str
    phone: str

    class Config:
        orm_mode = True


class SchemeUser(_SchemeUserBase):
    user_id: int
    role_id: int

    class Config:
        orm_mode = True


class SchemeUserReturn(_SchemeUserBase):
    name: str
    surname: str
    patronymic: str
    img: str | None
    phone: str

    class Config:
        orm_mode = True


class SchemeAdminCreateUser(_SchemeUserBase):
    hashed_password: str
    name: str
    surname: str
    patronymic: str
    phone: str
    role: str
