from flask import Blueprint, Response, request, jsonify, Flask
from marshmallow import ValidationError
from models import *
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from flask_bcrypt import Bcrypt

app = Flask(__name__)

app.config['SECRET_KEY'] = "1111"
app.config['SQLALCHEMY_DATABASE_URI'] = "mysql+mysqlconnector://root:1111@localhost/lab6"

counter = 1
bcrypt = Bcrypt(app)
session = sessionmaker(bind=engine)
ss = session()
orders = 1
products = 1

def create_app():
    return app

@app.route('/user', methods=['POST'])
def create_user():
    global counter

    data = request.get_json(force=True)
    db_user = ss.query(User).filter_by(username=data['username']).first()

    # Can we insert this person?
    if db_user:
        return Response(status=405, response='User with such username already exists.')

    try:
        hashed_password = bcrypt.generate_password_hash(data["password"])
        new_user = User(counter, data["username"], data["email"], hashed_password, data["phone"])

    except:
        return Response(status=400, response='Invalid user supplied')

    counter += 1
    ss.add(new_user)
    ss.commit()
    return Response(status=200, response='successful operation')


@app.route('/user/<userid>', methods = ['PUT'])
def put_user(userid):
    data = request.get_json(force=True)
    users = ss.query(User).filter(User.id==userid).first()


    if not users:
        return Response(status = 404, response = 'User not found')
    try:
        if("username" in list(data)):
            users.username = data['username']
            db_user = ss.query(User).filter_by(username=data['username']).first()

            # Can we insert this person?
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
def get_user(userId):
    try:
        user = ss.query(User).filter(User.id == userId).first()
    except:
        return Response(status = 400, response = 'Invalid ID supplied')
    if not user:
        return Response(status = 404, response = 'User not found')

    user_data = {"UserId" : user.id, "username" : user.username, "email" : user.email, "password": user.password,"phone" : user.phone}
    return jsonify({"user": user_data}), 200


@app.route('/user/login', methods=['GET'])
def login():
    data = request.get_json(force=True)
    users = User.query.filter_by(username=data['username']).first()
    if not users:
        return Response(status=400, response='Invalid username/password supplied')
    if (bcrypt.check_password_hash(users.password, data['password']) == False):
        return Response(status=400, response='Invalid username/password supplied')
    return Response(status=200, response='successful operation')


@app.route('/user/logout', methods=['GET'])
def logout():
    return Response(status='default', response='successful operation')


@app.route('/user/<userId>', methods=['DELETE'])
def delete_user(userId):
    try:
        user = ss.query(User).filter(User.id == userId).first()
    except:
        return Response(status=400, response='Invalid ID supplied')
    if not user:
        return Response(status=404, response='User not found')
    ss.delete(user)
    ss.commit()
    return Response(status='200', response='successful operation')



# Product
@app.route('/product', methods=['POST'])
def create_product():
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
def put_product(productId):
    data = request.get_json(force=True)
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
def delete_product(productId):
    try:
        product = ss.query(Product).filter(Product.id == productId).first()
    except:
        return Response(status = 400, response = 'Invalid ID supplied')
    if not product:
        return Response(status = 404, response = 'Product not found')
    ss.delete(product)
    ss.commit()
    return Response(status = '200',response = 'successful operation')


#Order
@app.route('/store/order', methods = ['POST'])
def make_order():
    global orders
    data = request.get_json(force=True)
    try:
        product = ss.query(Product).filter(Product.id==data['Product_IdProduct']).first()
        user = ss.query(User).filter(User.id==data['User_idUser']).first()
    except:
        return Response(status = '400', response = "Invalid response supplied")
    if (not product) or (not user):
        return Response(status = '404', response = "Product or User not found")

    order = Order(orders, data['quantity'], data['status'], data['Product_IdProduct'], data['User_idUser'])

    if(product.quantity <= order.quantity ):
        return Response(status = '405', response = "The product is not available")

    ss.add(order)
    product.quantity -= data['quantity']
    ss.commit()
    orders += 1

    return Response(status='200', response = "successful operation")


@app.route('/store/order/<orderId>', methods = ['GET'])
def get_order(orderId):
    try:
        order = ss.query(Order).filter(Order.id == orderId).first()
    except:
        return Response(status = '400', response = "Invalid ID supplied")
    if not order:
        return Response(status = '404', response = "Order not found")
    order_data = {"OrderId" : order.id, "quantity" : order.quantity, "status" : order.status, "User_idUser" : order.User_idUser , "Product_IdProduct": order.Product_IdProduct}
    return jsonify({"transfer": order_data}), 200


@app.route('/store/order/<orderId>', methods = ['DELETE'])
def delete_order(orderId):
    try:
        order = ss.query(Order).filter(Order.id == orderId).first()
    except:
        return Response(status = 400, response = 'Invalid ID supplied')
    if not order:
        return Response(status = 404, response = 'Order not found')
    ss.delete(order)
    ss.commit()
    return Response(status = '200',response = 'successful operation')


if __name__ == 'main':
    app.run(debug=True)
