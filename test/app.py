from flask import Blueprint, Response, request, jsonify, Flask
from marshmallow import ValidationError
from  models import *

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
from datetime import timedelta
from flask_jwt_extended import get_jwt

app = Flask(__name__)

app.config['SECRET_KEY'] = "1111"
app.config['SQLALCHEMY_DATABASE_URI'] = "mysql+mysqlconnector://root:1111@localhost/lab6"
app.config["JWT_SECRET_KEY"] = "super-secret"

jwt = JWTManager(app)

counter = 1
bcrypt = Bcrypt(app)
session = sessionmaker(bind=engine)
ss = session()
orders = 1
products = 1


@app.route('/user/login', methods=['GET'])
def login():
    
    data = request.get_json(force=True)

    user = ss.query(User).filter_by(username=data['username']).first()
    if not user:
        return Response(status = 400,response = 'User not found')

    if (bcrypt.check_password_hash(user.password, data["password"]) == True):
        access_token = create_access_token(identity=data["username"])
        return jsonify({"token" : access_token}), 200
  
    return Response(status=400, response="Can't login")

@app.route('/user/logout', methods=['GET'])
def logout():
    return Response(status='default', response='successful operation')

@app.route('/user', methods=['POST'])
def create_user():
    global counter

    data = request.get_json(force=True)
    db_user = ss.query(User).filter_by(username=data['username']).first()

    if db_user:
       return Response(status=405, response='User with such username already exists.')

    try:
        hashed_password = bcrypt.generate_password_hash(data["password"])
        new_user = User(counter, data['isAdmin'], data["username"], data["email"], hashed_password, data["phone"])

    except:
        return Response(status=400, response='Invalid user supplied')

    counter += 1
    ss.add(new_user)
    ss.commit()
    return Response(status=200, response='successful operation')


@app.route('/user/<userId>', methods = ['PUT'])
@jwt_required()
def put_user(userId):
    current_user = get_jwt_identity()
    data = request.get_json(force=True)
    users = ss.query(User).filter(User.id==userId).first()
    if not users:
        return Response(status=404, response='User not found')
    if(current_user != users.username):
        return Response(status = 405, response = "Current user doesn't have rights to make operation")

    try:
        if("username" in list(data)):
            users.username = data['username']
            db_user = ss.query(User).filter_by(username=data['username']).first()
            if db_user:
                return Response(status=405, response='User with such username already exists.')

        if('email' in list(data)):
            users.email = data['email']
        if('password' in list(data)):
            hashed_password = bcrypt.generate_password_hash(data["password"])
            users.password = hashed_password
        if('phone' in list(data)):
            users.phone = data['phone']
    except:
        return Response(status = 400, response = 'Invalid user suplied')
    ss.commit()
    state_data = {"username":users.username, "email" : users.email,"password": users.password, "phone" : users.phone}
    return jsonify({"user": state_data}), 200

@app.route('/user/<userId>', methods = ['GET'])
@jwt_required()
def get_user(userId):
    current_user = get_jwt_identity()
    users = ss.query(User).filter(User.id==userId).first()
    if not users:
        return Response(status=404, response='User not found')
    if(current_user != users.username):
        return Response(status = 405, response = "Current user doesn't have rights to make operation")
    try:
        user = ss.query(User).filter(User.id == userId).first()
    except:
        return Response(status = 400, response = 'Invalid ID supplied')
    if not user:
        return Response(status = 404, response = 'User not found')
    user_data = {"UserId" : user.id, "username" : user.username, "email" : user.email, "password": user.password,"phone" : user.phone}
    return jsonify({"user": user_data}), 200



@app.route('/user/<userId>', methods=['DELETE'])
@jwt_required()
def delete_user(userId):
    current_user = get_jwt_identity()
    users = ss.query(User).filter(User.id==userId).first()
    if not users:
        return Response(status=404, response='User not found')
    if(current_user != users.username):
        return Response(status = 405, response = "Current user doesn't have rights to make operation")
    user = ss.query(User).filter(User.id == userId).first()
    ss.delete(user)
    ss.commit()
    return Response(status='200', response='successful operation')



# Product
@app.route('/product', methods=['POST'])
@jwt_required()
def create_product():
    current_user = get_jwt_identity()
    users = ss.query(User).filter(User.username==current_user).first()
    if not users.isAdmin:
        return Response(status = 405, response = "Current user doesn't have rights to make operation")
    global products
    try:
        data = request.get_json(force=True)
        new_product = Product(products, data["name"], data["category"], data["quantity"], data["status"])
    except:
        return Response(status = 400, response = 'Invalid product suplied')
    products += 1
    ss.add(new_product)
    ss.commit()
    return Response(status = 200,response = 'successful operation')


@app.route('/product/<productId>', methods=['PUT'])
@jwt_required()
def put_product(productId):
    current_user = get_jwt_identity()
    users = ss.query(User).filter(User.username==current_user).first()
    data = request.get_json(force=True)
    if not users.isAdmin:
        return Response(status = 405, response = "Current user doesn't have rights to make operation")
    product = ss.query(Product).filter(Product.id == productId).first()
    if not product:
        return Response(status=404, response='Product not found')
    try:
        if ("name" in list(data)):
            product.name = data['name']
        if ('category' in list(data)):
            product.category = data['category']
        if ('quantity' in list(data)):
            product.quantity = data['quantity']
        if ('status' in list(data)):
            product.status = data['status']
    except:
        return Response(status=400, response='Invalid product supplied')
    ss.commit()
    state_data = {"name": product.name, "category": product.category, "quantity": product.quantity, "status": product.status}
    return jsonify({"product": state_data}), 200


@app.route('/product/<productId>', methods = ['GET'])
def get_product(productId):
    try:
        product = ss.query(Product).filter(Product.id == productId).first()
    except:
        return Response(status = 400, response = 'Invalid ID supplied')
    if not product:
        return Response(status = 404, response = 'Product not found')
    product_data = {"ProductId" : product.id, "name" : product.name, "category" : product.category, "quantity" : product.quantity, "status" : product.status}
    return jsonify({"Product": product_data}), 200


@app.route('/product/<productId>', methods = ['DELETE'])
@jwt_required()
def delete_product(productId):
    current_user = get_jwt_identity()
    users = ss.query(User).filter(User.username==current_user).first()
    if not users.isAdmin:
        return Response(status = 405, response = "Current user doesn't have rights to make operation")
    
    product = ss.query(Product).filter(Product.id == productId).first()
    if not product:
        return Response(status = 404, response = 'Product not found')
    ss.delete(product)
    ss.commit()
    return Response(status = '200',response = 'successful operation')


# #Order
@app.route('/store/order', methods = ['POST'])
@jwt_required()
def make_order():
    global orders
    current_user = get_jwt_identity()
    users = ss.query(User).filter(User.username==current_user).first()
    data = request.get_json(force=True)
    try:
        product = ss.query(Product).filter(Product.id==data['productId']).first()
        user = ss.query(User).filter(User.id==data['userId']).first()
    except:
        return Response(status = '400', response = "Invalid response supplied")
    if (not product) or (not user):
        return Response(status = '404', response = "Product or User not found")
    if not users.id == data['userId']:
        return Response(status = 405, response = "Current user doesn't have rights to make operation")
    order = Order(orders, data['quantity'], data['status'], data['userId'], data['productId'])

    if(product.quantity <= order.quantity ):
        return Response(status = '405', response = "The product is not available in quantity that u want")

    ss.add(order)
    product.quantity -= data['quantity']
    ss.commit()
    orders += 1

    return Response(status='200', response = "successful operation")


@app.route('/store/order/<orderId>', methods = ['GET'])
@jwt_required()
def get_order(orderId):
    current_user = get_jwt_identity()
    users = ss.query(User).filter(User.username==current_user).first()
    order = ss.query(Order).filter(Order.id == orderId).first()
    if not order:
        return Response(status = '404', response = "Order not found")
    if users.id != order.User_idUser and users.isAdmin == False:
            return Response(status = 405, response = "Current user doesn't have rights to make operation")
    order_data = {"OrderId" : order.id, "quantity" : order.quantity, "status" : order.status, "userId" : order.User_idUser , "productId": order.Product_IdProduct}
    return jsonify({"transfer": order_data}), 200


@app.route('/store/order/<orderId>', methods = ['DELETE'])
@jwt_required()
def delete_order(orderId):
    current_user = get_jwt_identity()
    users = ss.query(User).filter(User.username==current_user).first()
    order = ss.query(Order).filter(Order.id == orderId).first()
    if not order:
        return Response(status = 404, response = 'Order not found')
    if users.id != order.User_idUser and users.isAdmin == False:
            return Response(status = 405, response = "Current user doesn't have rights to make operation")
    ss.delete(order)
    ss.commit()
    return Response(status = '200',response = 'successful operation')


if __name__ == 'main':
    app.run(debug=True)
