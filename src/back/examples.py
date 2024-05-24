from pickle import TRUE
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from models import *

session = sessionmaker(bind=engine)
ss = session()
user1 = User(user_id=1, username='white_rabbit', password='12345', email='name_lastname@lpnu.ua')
request_1 = Request(request_id=1, text='I feel awful, I feel like shit', estimation=0, date='2024-03-18', user_id=None)

ss.add(user1)
ss.add(request_1)
ss.commit()


ss.close()
