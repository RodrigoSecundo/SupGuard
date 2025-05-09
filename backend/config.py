import os

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://seu.usuario:sua.senha@localhost:5432/supguard")

class Config:
    SQLALCHEMY_DATABASE_URI = DATABASE_URL
    SQLALCHEMY_TRACK_MODIFICATIONS = False
