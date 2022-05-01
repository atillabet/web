from sqlalchemy import create_engine, MetaData
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from config import SERVER, USERNAME, PASSWORD, DB


Base = declarative_base()