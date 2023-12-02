from flask import Flask, jsonify, render_template, request, redirect, send_file, url_for
from werkzeug.utils import secure_filename, send_from_directory
import os
import subprocess

app = Flask(__name__)

@app.route("/")
def hello_world():
    return render_template('index.html')

@app.route("/create")
def create():
    return render_template('create.html')

@app.route("/build", methods=['POST'])
def build():
    if not request.method == "POST":
        return jsonify({'message': 'Wrong command'})
    intents = request.get_json()
    print(intents)
    subprocess.run(['python', './train.py', '--intents', str(intents).replace('\'', '\"')])
    return jsonify({'message': 'Data received succesfully'})

if __name__ == "__main__":
    app.run(debug=True)