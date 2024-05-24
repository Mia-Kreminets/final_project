from flask import Blueprint, jsonify, Response, request, Flask, make_response
from models import *
from flask_cors import CORS
import joblib
import torch
import numpy as np
from transformers import AutoTokenizer, AutoModelForSequenceClassification


from marshmallow import ValidationError

from sqlalchemy.orm import sessionmaker

app = Flask(__name__)

CORS(app)
app.config['SECRET_KEY'] = "newpassword0"
app.config['SQLALCHEMY_DATABASE_URI'] = "mysql+mysqlconnector://root:newpassword0@localhost/mydb2"

session = sessionmaker(bind=engine)
ss = session()
counter = ss.query(User).count() + 1
requests = ss.query(Request).count() + 1
used_tokens =[]
current_user = ''

def load_model_and_tokenizer(model_directory):
    tokenizer = AutoTokenizer.from_pretrained(model_directory)
    model = AutoModelForSequenceClassification.from_pretrained(model_directory, use_safetensors=True)
    return model, tokenizer

def prepare_inputs(texts, tokenizer):
    inputs = tokenizer(
        texts,
        padding=True,
        truncation=True,
        return_tensors="pt",
        max_length=512
    )
    return inputs

def predict_labels(texts, model, tokenizer):
    inputs = prepare_inputs(texts, tokenizer)
    input_ids = inputs['input_ids']
    attention_mask = inputs['attention_mask']
    
    model.eval()
    with torch.no_grad():
        outputs = model(input_ids, attention_mask=attention_mask)
        logits = outputs.logits
        sigmoid = torch.nn.Sigmoid()
        probs = sigmoid(logits.squeeze().cpu())
        predictions = np.zeros(probs.shape)
        predictions[np.where(probs >= 0.5)] = 1
    return predictions


def resp(label):
    if label == 1:
        return 'Yes'
    return 'No' 

model_directory = './best_model'
model, tokenizer = load_model_and_tokenizer(model_directory)


@app.route('/user', methods=['POST'])
def create_user():
    global counter
    data = request.get_json(force=True)
    db_email = ss.query(User).filter_by(email=data['email']).first()
    db_user = ss.query(User).filter_by(username=data['username']).first()

    if db_user:
        return make_response('User with such username already exists', 405)

    if db_email:
        return make_response('User with such email already exists', 405)

    try:
        hashed_password = data["password"] ### don't  forget to add hash to passwords
        new_user = User(counter, data["username"], hashed_password, data["email"])

    except:
        return Response(status=400, response='Invalid user supplied')

    counter += 1
    ss.add(new_user)
    ss.commit()
    return jsonify({"data": { "id": counter -1, "email": data['email'], "username": data['username']  }}), 200


@app.route('/user/login', methods=['POST'])
def login():
    data = request.get_json(force=True)
    username = data['username']
    password = data['password']
    user = ss.query(User).filter_by(username=username).first()
    if not user:
        return make_response('Incorrect username', 404)
    global current_user;
    if user.password != password:
        return make_response('Incorrect password', 401)

    if user.password == password:
        current_user = user
        return jsonify({"data": { "id": current_user.user_id, "email": current_user.email, "username": current_user.username  }}), 200
    return Response(status=200, response='Successful operation ;)')


@app.route('/user/logout', methods=['GET'])
def logout():
    if 'x-access-token' in request.headers:
            token = request.headers['x-access-token']
            used_tokens.append(token)
    return Response(status='default', response='successful operation')

@app.route('/user/<userId>', methods = ['PUT'])
def put_user(userId):
    data = request.get_json(force=True)
    users = ss.query(User).filter(User.id==userId).first()
    if not users:
        return Response(status = 404, response = 'User not found')
    try:
        if("username" in list(data)):
            db_user = ss.query(User).filter_by(username=data['username']).first()
            if db_user:
                return Response(status=405, response='User with such username already exists.')
            users.username = data['username']
            
        if('email' in list(data)):
            db_user = ss.query(User).filter_by(username=data['email']).first()
            if db_user:
                return Response(status=405, response='User with such email already exists.')
            users.email = data['email']

        if('password' in list(data)):
            hashed_password = data["password"]
            users.password = hashed_password

    except:
        return Response(status = 400, response = 'Invalid user suplied')
    ss.commit()
    state_data = {'id': userId}
    return jsonify({"user": state_data}), 200


@app.route('/request', methods=['POST'])
def create_request():
    global requests
    try:
        data = request.get_json(force=True)
        new_request = Request(requests, data["text"], data["estimation"], data["date"], data["user_id"])
    except:
        return Response(status = 400, response = 'Invalid product suplied')
    requests += 1
    ss.add(new_request)
    ss.commit()
    return Response(status = 200, response = 'successful operation')


@app.route('/estimate', methods=['POST'])
def create_estimate():
    data = request.get_json(force=True)
    text = data['text']
    texts = [text, 'test']
    predictions = predict_labels(texts, model, tokenizer)
    resp = str(predictions[0])
    if resp:
            return Response(status=200, response=resp)
    else:
            return Response(status=300, response='Try later, Cowboy, something is definetely wrong')


if __name__ == 'main':
    app.run(debug=False)
