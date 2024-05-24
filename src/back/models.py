from sqlalchemy import Column, Boolean, Integer, String, Date, ForeignKey

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

from sqlalchemy.orm import sessionmaker, scoped_session
engine = create_engine("mysql+mysqlconnector://root:newpassword0@localhost/the_last_drop", echo=True)
Base = declarative_base()
db_session = scoped_session(sessionmaker(autocommit=False,
                                         autoflush=False,
                                         bind=engine))
metadata = Base.metadata
Base.query = db_session.query_property()

class User(Base):
    __tablename__ = 'user'
    user_id = Column(Integer(), primary_key=True, autoincrement=True)
    username = Column(String(45), nullable=False)
    password = Column(String(205), nullable=False)
    email = Column(String(45), nullable=True)

    def __init__(self, user_id, username, password, email):
        self.user_id = user_id
        self.username = username
        self.password = password
        self.email = email

    def repr(self):
        return f"{self.user_id}, {self.username}, {self.password}, {self.email}"

    def __str__(self):
        return f"User ID      : {self.user_id}\n" \
               f"Username     : {self.username}\n" \
               f"Email        : {self.email}\n" \


class Request(Base):
    __tablename__ = 'request'
    request_id = Column(Integer(), primary_key=True,  autoincrement=True)
    text = Column(String(1000), nullable=False)
    estimation = Column(Boolean(), nullable=False)
    date = Column(Date())
    user_id = Column(Integer(), ForeignKey('user.user_id'), nullable=True)
    user = relationship("User")
    def __init__(self, request_id, text, estimation, date, user_id):
        self.request_id = request_id
        self.text = text
        self.estimation = estimation
        self.date = date
        self.user_id = user_id

    def repr(self):
        return f"{self.id}, {self.text}, {self.estimation}, {self.date}, {self.user_id}"
