import base64
from flask import *
from app import *
from alembic.command import upgrade, downgrade
from alembic.config import Config
import pytest

token1 = ''
token2 = ''

def test_create_user(client):
        user = json.dumps({
            "username" : "test",
            "email" : "test",
            "password" : "test",
            "phone" : "test",
            "isAdmin" : True
        })
        response = client.post('/user', data=user, content_type='application/json')
        assert response.status_code == 200

        user1 = json.dumps({
            "username" : "test1",
            "email" : "test1",
            "password" : "test1",
            "phone" : "test1",
            "isAdmin" : False
        })
        response = client.post('/user', data=user1, content_type='application/json')
        assert response.status_code == 200

        response = client.post('/user', data=user1, content_type='application/json')
        assert response.status_code == 405

        user1 = json.dumps({
            "username" : "test5"
        })
        response = client.post('/user', data=user1, content_type='application/json')
        assert response.status_code == 400
        
def test_login(client):
        global token1
        global token2
        user = json.dumps({"username" : "test2",
                        "password" : "test2" 
                })
        response = client.get('/user/login', data=user, content_type='application/json')
        assert response.status_code == 400
        
        user = json.dumps({"username" : "test",
                        "password" : "test2" 
                })
        response = client.get('/user/login', data=user, content_type='application/json')
        assert response.status_code == 400

        user = json.dumps({"username" : "test",
                        "password" : "test" 
                })
        response = client.get('/user/login', data=user, content_type='application/json')
        assert response.get_json()["token"] != ''
        token1 = response.get_json()["token"]

        user = json.dumps({"username" : "test1",
                        "password" : "test1" 
                })
        response = client.get('/user/login', data=user, content_type='application/json')
        assert response.get_json()["token"] != ''
        token2 = response.get_json()["token"]

def test_put_user(client):
        global token1
        global token2
        headers1 = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token1
        }
        
        user = json.dumps({"email" : "test3"})

        response = client.put('/user/55', data=user, content_type='application/json', headers=headers1)
        assert response.status_code == 404

        response = client.put('/user/2', data=user, content_type='application/json', headers=headers1)
        assert response.status_code == 405

        response = client.put('/user/1', data=user, content_type='application/json', headers=headers1)
        assert response.status_code == 200
        assert response.get_json()["user"]["email"] == "test3"


def test_get_user(client):
        global token1
        global token2
        headers1 = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token1
        }
        headers2 = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token2
        }
        response = client.get('/user/44', headers=headers2)
        assert response.status_code == 404


        response = client.get('/user/2', headers=headers2)

        assert response.status_code == 200
        assert response.get_json()["user"]["username"] == "test1"

def test_create_product(client):
        product = json.dumps({"name" : "test",
                        "category" : "test",
                              "quantity" : 3,
                              "status" : "test"})
        global token1
        headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token1
        }
        response = client.post('/product', data=product, content_type='application/json', headers=headers)
        assert response.status_code == 200
        
        product = json.dumps({"name" : "test",
                        "category" : "test",
                              "quantity" : "test"})
        response = client.post('/product', data=product, content_type='application/json', headers=headers)
        assert response.status_code == 400

def test_put_product(client):
        product = json.dumps({"name" : "test2"})
        global token1
        global token2
        headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token1
        }
        headers2 = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token2
        }               
        response = client.put('/product/1', data=product, content_type='application/json', headers=headers2)
        assert response.status_code == 405

        response = client.put('/product/1', data=product, content_type='application/json', headers=headers)
        assert response.status_code == 200
        assert response.get_json()["product"]["name"] == "test2"

def test_make_order(client):
        global token1
        global token2
        headers1 = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token1
        }
        headers2 = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token2
        }
        product = json.dumps({"name" : "test",
                        "category" : "test",
                              "quantity" : 1,
                              "status" : "test"})

        response = client.post('store/order', data=product, content_type='application/json', headers=headers1)
        assert response.status_code == 400
        
        order = json.dumps({"quantity" : 1,
                       "status" : "test",
                        "userId" : 1,
                        "productId" : 4})
        response = client.post('store/order', data=order, content_type='application/json', headers=headers1)
        assert response.status_code == 404

        order = json.dumps({"quantity" : 400,
                       "status" : "test",
                        "userId" : 1,
                        "productId" : 1})
        response = client.post('store/order', data=order, content_type='application/json', headers=headers1)
        assert response.status_code == 405

        order = json.dumps({"quantity" : 1,
                       "status" : "test",
                        "userId" : 1,
                        "productId" : 1})
        response = client.post('store/order', data=order, content_type='application/json', headers=headers1)
        assert response.status_code == 200

def test_get_oreder(client):
        global token1
        global token2

        headers1 = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token1
        }
        headers2 = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token2
        }
        response = client.get('store/order/1', headers=headers2)
        assert response.status_code == 405

        response = client.get('store/order/3', headers=headers2)
        assert response.status_code == 404

        response = client.get('store/order/1', headers=headers1)
        assert response.status_code == 200
        
        assert response.get_json()["transfer"]["status"] == "test"

def test_delete_order(client):
        global token1
        global token2
        headers1 = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token1
        }
        headers2 = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token2
        }

        response = client.delete('store/order/1', headers=headers2)
        assert response.status_code == 405

        response = client.delete('store/order/3', headers=headers2)
        assert response.status_code == 404

        response = client.delete('store/order/1', headers=headers1)
        assert response.status_code == 200

def test_delete_product(client):
        global token1
        global token2
        headers1 = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token1
        }
        headers2 = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token2
        }
        
        response = client.delete('product/4', headers=headers1)
        assert response.status_code == 404

        response = client.delete('product/1', headers=headers2)
        assert response.status_code == 405

        response = client.delete('product/1', headers=headers1)
        assert response.status_code == 200

def test_delete_user(client):
        global token1
        global token2
        headers1 = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token1
        }
        headers2 = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token2
        
        }

        response = client.delete('user/4', headers=headers1)
        assert response.status_code == 404

        response = client.delete('user/1', headers=headers2)
        assert response.status_code == 405

        response = client.delete('user/1', headers=headers1)
        assert response.status_code == 200

        response = client.delete('user/2', headers=headers2)
        assert response.status_code == 200

def test_logout(client):
        response = client.get('/user/logout')
        assert response.status_code == 0
