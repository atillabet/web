from sqlalchemy import Table, Integer, String, \
    Column, ForeignKey
from sqlalchemy.orm import relationship

from base import Base
from sqlalchemy.sql.sqltypes import Date


class User(Base):
    __tablename__ = 'user'
    user_id = Column(Integer(), primary_key=True, autoincrement=True, unique=True)
    firstName = Column(String(45), nullable=True)
    lastName = Column(String(45), nullable=True)
    email = Column(String(45), nullable=True)
    password = Column(String(45), nullable=True)
    phone = Column(String(45), nullable=True)


class Purse(Base):
    __tablename__ = 'purse'
    purse_id = Column(Integer(), primary_key=True, autoincrement=True, unique=True)
    funds = Column(Integer(), nullable=True)

class Transfer(Base):
    __tablename__ = 'transfer'
    transfer_id = Column(Integer(), primary_key=True, autoincrement=True, unique=True)
    quantity_funds = Column(Integer(),  nullable=True)
    date = Column(Date(), nullable=True)
    user_id_from = Column(Integer(), ForeignKey('user.user_id'), primary_key=True)
    user_id_to = Column(Integer(), ForeignKey('user.user_id'), primary_key=True)
    purse_id_from = Column(Integer(), ForeignKey('purse.purse_id'), primary_key=True)
    purse_id_to = Column(Integer(), ForeignKey('purse.purse_id'), primary_key=True)
    user = relationship("User")
    purse = relationship("Purse")