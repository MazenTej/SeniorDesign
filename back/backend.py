from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route('/query', methods=['POST'])
def query():
    message = request.json.get('message')
    response = "this is a dummy response"
    return jsonify({'response': response})


if __name__ == '__main__':
    app.run(debug=True)
