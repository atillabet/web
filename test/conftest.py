import pytest

from app import app as flask_app

@pytest.fixture
def app():
    flask_app.config['DEBUG'] = True
    flask_app.config['TESTING'] = True
    yield flask_app

@pytest.fixture
def client(app):
    return app.test_client()
