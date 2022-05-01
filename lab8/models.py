from sqlalchemy import Column, Integer, String, ForeignKey

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy.orm import sessionmaker, scoped_session
engine = create_engine("mysql+mysqlconnector://root:1111@localhost/lab6", echo=True)
Base = declarative_base()
db_session = scoped_session(sessionmaker(autocommit=False,
                                         autoflush=False,
                                         bind=engine))
metadata = Base.metadata
Base.query = db_session.query_property()

class User(Base):
    __tablename__ = 'user'
    id = Column(Integer(), primary_key=True, autoincrement=True, unique=True)
    username = Column(String(45), nullable=True)
    email = Column(String(45), nullable=True)
    password = Column(String(100), nullable=True)
    phone = Column(String(45), nullable=True)

    def __repr__(self):
        return f"{self.id}, {self.username}, {self.email}, {self.password}, {self.phone}"

    def __init__(self, id, username, email, password, phone):
        self.id = id
        self.username = username
        self.email = email
        self.password = password
        self.phone = phone


class Product(Base):
    __tablename__ = 'product'
    id = Column(Integer(), primary_key=True, autoincrement=True, unique=True)
    name = Column(String(45), nullable=True)
    category = Column(String(45), nullable=True)
    quantity = Column(Integer, nullable=True)
    status = Column(String(45), nullable=True)

    def __repr__(self):
        return f"{self.id}, {self.name}, {self.category}, {self.quantity}, {self.status}"

    def __init__(self, id, name, category, quantity, status):
        self.id = id
        self.name = name
        self.category = category
        self.quantity = quantity
        self.status = status


class Order(Base):
    __tablename__ = "order"
    id = Column(Integer(), primary_key=True, autoincrement=True, unique=True)
    quantity = Column(Integer(), nullable=True)
    status = Column(String(45), nullable=True)
    User_idUser = Column(Integer(), ForeignKey('user.id'))
    Product_IdProduct = Column(Integer(),  ForeignKey('product.id'))

    def __init__(self, id, quantity, status, User_idUser, Product_IdProduct):
        self.id = id
        self.quantity = quantity
        self.status = status
        self.User_idUser = User_idUser
        self.Product_IdProduct = Product_IdProduct

    def __repr__(self):
        return f"{self.idAudience}, {self.number}, {self.amount_of_places}, {self.status}, self.Product_IdProduct= {self.User_idUser}"


"""" class OrderSchema(ma.SQLAlchemySchema):
  class Meta:
    model = Order

  id = ma.auto_field()
  quantity = ma.auto_field()
  status = ma.auto_field()
  User_idUser = ma.auto_field()
  Product_IdProduct = ma.auto_field()
"""
