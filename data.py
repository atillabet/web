from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from models import *


session = sessionmaker(bind=engine)

add_user = User(id=3, username="Aaasdfs", email="Porebrddyk@gmail.com", password="111234", phone="091234")
add_user2 = User(id=4, username="Fasdfd", email="Vasyddliev@gmail.com", password="1231141234", phone="12341234")

add_product = Product(id=3, name="not codfdfsffee", category="Not ffood", quantity=1000, status='cool')
add_product2 = Product(id=4, name="coffedffde", category="fofod", quantity=10, status='not cool')


add_order = Order(id=6, quantity=1, status='cool', User_idUser=3, Product_IdProduct = 3)
add_order2 = Order(id=4, quantity= 2, status='not cool', User_idUser=4, Product_IdProduct=4)
add_order3 = Order(id=5, quantity= 2, status='not cool', User_idUser=3, Product_IdProduct=4)

ss = session()

ss.add(add_product)
ss.add(add_product2)
ss.add(add_user)
ss.add(add_user2)

ss.commit()

ss.add(add_order)
ss.add(add_order2)
ss.add(add_order3)
ss.commit()