from flask import Flask
app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello World 14'

if __name__ == "__main__":
    app.run('localhost', 5000)
