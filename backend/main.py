from fastapi import FastAPI

from src.routers import auth, user, article, admin, analyst, operator, hr

app = FastAPI()

app.include_router(auth.router)
app.include_router(user.router)
app.include_router(article.router)
app.include_router(admin.router)
app.include_router(analyst.router)
app.include_router(operator.router)
app.include_router(hr.router)
