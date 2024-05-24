from flask import Blueprint, Response, request, jsonify, Flask
from marshmallow import ValidationError
from models import *
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

app = Flask(__name__)

app.config['SECRET_KEY'] = "1111"
app.config['SQLALCHEMY_DATABASE_URI'] = "mysql+mysqlconnector://root:newpassword0@localhost/the_last_drop"