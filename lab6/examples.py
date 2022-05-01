from sqlalchemy import create_engine, engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy import Column, Boolean, Integer, String, Date, ForeignKey

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy.orm import sessionmaker
from models import *



session = sessionmaker(bind=engine)

add_user = User(user_id=1, firstName="Aass",lastName="ss", email="Porebryk@gmail.com", password="1234", phone="091234")
add_user2 = User(user_id=2, firstName="Fasd",lastName="ss", email="Vasyliev@gmail.com", password="12341234", phone="12341234")


add_purse = Purse( purse_id=1, funds=1000, user_id=1)
add_purse2 = Purse( purse_id=2, funds=4000, user_id=2)

add_transfer = Transfer(transfer_id=1, quantity_funds=10, date='21.09.2020', purse_id_from=1,purse_id_to=2)
add_transfer2 = Transfer(transfer_id=2, quantity_funds= 200,  date='21.09.2021', purse_id_from=2,purse_id_to=1)
add_transfer3 = Transfer(transfer_id=3, quantity_funds= 100,  date='24.09.2021', purse_id_from=1,purse_id_to=2)
ss = session()
 
ss.add(add_user)
ss.add(add_user2)
ss.add(add_purse)
ss.add(add_purse2)
ss.commit()
ss.add(add_transfer)
ss.add(add_transfer2)
ss.add(add_transfer3)

ss.commit()