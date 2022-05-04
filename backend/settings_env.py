import os
from os.path import join, dirname

from dotenv import load_dotenv

dotenv_path = join(dirname(__file__), ".env")
load_dotenv(dotenv_path)

DB_HOST: str = os.environ.get("DB_HOST")
DB_ROOT: str = os.environ.get("DB_ROOT")
DB_PASSWORD: str = os.environ.get("DB_PASSWORD")
DB_NAME: str = os.environ.get("DB_NAME")

SECRET_KEY: str = os.environ.get("SECRET_KEY")

ADMIN: int = int(os.environ.get("ADMIN"))
ANALYST: int = int(os.environ.get("ANALYST"))
OPERATOR: int = int(os.environ.get("OPERATOR"))
USER: int = int(os.environ.get("USER"))

PATH_TO_FILES: str = str(os.environ.get("PATH_TO_FILES"))
