
from flask import Flask, jsonify, request, session,redirect, url_for, render_template, flash
from flask_cors import CORS 
from datetime import timedelta
import psycopg2
import psycopg2.extras
import secrets
from pathlib import Path
import re 
from werkzeug.security import generate_password_hash, check_password_hash
from config import config
app = Flask(__name__)
#app.config['SECRET_KEY'] = ''

#store secret key for session 
SECRET_FILE_PATH = Path(".flask_secret")
try:
    with SECRET_FILE_PATH.open("r") as secret_file:
        app.secret_key = secret_file.read()
except FileNotFoundError:
    # Let's create a cryptographically secure code in that file
    with SECRET_FILE_PATH.open("w") as secret_file:
        app.secret_key = secrets.token_hex(32)
        secret_file.write(app.secret_key) 
app.config['PERMANENT_SESSION_LIFETIME'] =  timedelta(minutes=10)
CORS(app) 


def get_db_connection():
    conn=None
    try:
        params = config()
        conn = psycopg2.connect(**params)
        return conn
    except(Exception, psycopg2.Error) as error:
        print(error)

    

@app.route('/')
def home():
    # Check if user is loggedin
    print("home")
    
 

#log in
@app.route("/login/",methods=['POST'])

def login():
    # Establish a database connection
    conn = get_db_connection()

    # Extract username and password from the request payload
    _json = request.json
    _username = _json['username']
    _password = _json['password']

    # Check if both username and password are provided
    if _username and _password:
        # Retrieve the user account from the database based on the provided username
        cursor = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)
        cursor.execute("SELECT * FROM users WHERE username=%s", (_username,))
        account = cursor.fetchone()

        if account:
            # Account exists
            username = account['username']
            password = account['password']

            # Check if the provided password matches the hashed password
            if check_password_hash(password, _password):
                # Password is correct, log in the user by setting session variables
                session['username'] = username
                session['loggedin'] = True
                cursor.close()
                print('Logged in successfully')
                return jsonify({'message' : 'You are logged in successfully.'})
                #print('Logged in successfully')
                
                #return redirect(url_for('candidate'))
            else:
                # Incorrect password
                resp = jsonify({'message': 'Incorrect username/password'})
                session['loggedin'] = False
                resp.status_code = 400
                return resp
        else:
            # Account does not exist
            resp = jsonify({'message': 'Incorrect username/password'})
            session['loggedin'] = False
            resp.status_code = 400
            return resp
        
    
    else:
        # Missing username or password in the request
        resp = jsonify({'message': 'Bad Request - incorrect username/password'})
        resp.status_code = 400
        return resp
    
    
@app.route('/logout')
def logout():
    if 'username' in session :
        session.pop('username', None)
        session.pop('loggedin', None)
        return jsonify({'message' : 'You successfully logged out'})

@app.route('/candidate')

def candidate():
    try:
        if 'username' in session and session['loggedin']:
            # User is logged in
            conn = get_db_connection()
            print("Opened database successfully")
            cur = conn.cursor()
            cur.execute("SELECT * from candidate")
            rows = cur.fetchall()
            for row in rows:
                print (rows)
                print ("Operation done successfully")
            cur.close()
            conn.close()
            
            return jsonify(rows)
        else:
            # User is not logged in
            return jsonify({'message': 'Profile page- user not loggedin'})
    except:
        print('Error')


if __name__=='__main__':
    app.run(debug=True)


