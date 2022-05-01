from flask import request, Response, jsonify, Flask

from jsonschema import ValidationError
from sqlalchemy.orm import sessionmaker
from models import *

user = Flask(__name__)

engine = create_engine("mysql+mysqlconnector://root:q1w2e3r4t5Y6@localhost/lab6", echo=True)

Base = declarative_base()
metadata = Base.metadata

session = sessionmaker(bind=engine)
ss = session()




@user.route('/api/v1/user', methods =['POST'])
def create_user(user):
  """
  This function creates a new person in the people structure
  based on the passed-in person data
  :param person: person to create in people structure
  :return:    201 on success, 406 on person exists
  """

  data = request.get_json(force=True)

  db_user = ss.query(User).filter_by(username=data['username']).first()

  # Can we insert this person?
  if db_user:
    return Response(status=405, response='User with such username already exists.')
    # Create a person instance using the schema and the passed-in person

  try:
    schema = UserSchema()
    new_user = schema.load(data)
  except ValidationError as err:
    return jsonify(err.messager), 400

    # Add the person to the database
    new_user = User()
    new_user.id = data['id']
    new_user.username = data['username']
    new_user.email = data['email']
    new_user.password = data['password']
    new_user.phone = data['phone']


  ss.add(new_user)
  ss.commit()
   # Serialize and return the newly created person in the response
  return Response(status=200, response='New user was added to database')



@user.route('/api/v1/user/<username>', methods =['PUT'])
def update_user(username):
  data = request.get_json()

  #check if user exist
  db_user = ss.query(User).filter_by(username=username).first()
  if not db_user:
    return Response(status=404, response='User not found.')

  try:
    schema = UserSchema()
    new_user = schema.load(data)
  except ValidationError as err:
    return jsonify(err.messager), 400

  new_user = ss.query(User).filter(User.id == db_user.id).one()

  new_user.username = data['username']
  new_user.email = data['email']
  new_user.password = data['password']
  new_user.phone = data['phone']

  n_user = ss.query(User).filter(User.username == new_user.username or User.email == new_user.email or User.phone == new_user.phone).first()
  # Can we insert this person?
  if n_user:
    return Response(status=405, response='User with such username or email or phone already exists.')

  ss.commit()
  return Response(status=200, response='User was update successfully')


@user.route("/user/<id>", methods=["DELETE"])
def delete_user(id):
  data = request.get_json(force=True)

  db_user = ss.query(User).filter_by(id=data['id']).first()

  # Can we insert this person?
  if not db_user:
    return Response(status=404, response='User with such id not exists.')

  else:
    user = User.query.get(id)
    ss.delete(user)
    ss.commit()

    return Response(status=200, response='User was deleted')