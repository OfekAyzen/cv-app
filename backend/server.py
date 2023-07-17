
from flask import Flask, jsonify, request, session,redirect, url_for, render_template, flash
from flask_cors import CORS 
from datetime import timedelta
import psycopg2
import psycopg2.extras
import secrets
from pathlib import Path
import re 
from werkzeug.security import generate_password_hash, check_password_hash
from db_connection import get_db_connection
from candidates import Candidate_users
from manager import Manager_users


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
CORS(app, resources={r"/*": {"origins": "http://localhost:5173", "methods": ["GET", "POST"]}})


    

@app.route('/')
def home():
    # Check if user is loggedin
    #redirect(url_for('login'))
    print("home")
    
 
def check_login(username, password):
    # Connect to the PostgreSQL database
    conn = get_db_connection()
    cursor = conn.cursor()

    # Check if the user is a manager
    cursor.execute("SELECT * FROM users WHERE username = %s", (username,))
    manager = cursor.fetchone()

    if manager:
        print("if manager =",manager)
        # Account exists in the 'users' table
        session['role']="manager"
        # Password and role are correct for a manager
        return 'manager'

    # Check if the user is a candidate
    cursor.execute("SELECT * FROM candidate WHERE username = %s", (username,))
    candidate = cursor.fetchone()
    
    if candidate:
        print("if candidate =",candidate)
        # Account exists in the 'candidates' table
        
        session['role']="candidate"
        # Password and role are correct for a candidate
        return 'candidate'

    # Close the database connection
    cursor.close()
    conn.close()

    return None

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data['username']
    password = data['password']
    
    role = check_login(username, password)
    session['username'] = username
    session['password'] = password
    if role == 'manager':
        session['loggedin'] = True
        session['role']="manager"
        return jsonify({'message': 'Logged in as manager'})
    elif role == 'candidate':
        session['loggedin'] = True
        
        session['role']="candidate"
        
        return jsonify({'message': 'Logged in as candidate'})
    else:
        return jsonify({'message': 'Incorrect username or password'})


    
@app.route('/logout')
def logout():
    if 'username' in session :
        session.pop('username', None)
        session.pop('loggedin', None)
        return jsonify({'message' : 'You successfully logged out'})



@app.route('/candidate',methods=['GET'])
def candidate():
    try:
        if 'username' in session and session['loggedin'] :
            
            candidate_obj = Manager_users()
            result = candidate_obj.view_candidate()
            return jsonify(result)
        
        else:
            # User is not logged in
            return jsonify({'message': 'Profile page- user not loggedin'})
    except:
        print('Error')

#filter the candidate by education,gender,work_experience
@app.route('/filter_candidate',methods=['GET'])
def filter_candidate():
    try:
        if 'username' in session and session['loggedin'] :
            
            filters = {
                'education': request.args.get('education'),
                'gender': request.args.get('gender'),
                'work_experience': request.args.get('work_experience')
            }
            
            candidate_obj = Manager_users()
            print("filters :",filters)
            result = candidate_obj.filter_candidate(filters=filters)
            print("result:", type(result))
            return jsonify(result)
        
        else:
            # User is not logged in
            return jsonify({'message': 'Profile page- user not loggedin'})
    except:
        print('Error')



#registration \ job application ?

@app.route('/add_application', methods=['POST'])
def insert_candidate():
    username = session['username']
    password = session['password']
    try:
        if session['role']=="candidate":
            candidate_obj = Candidate_users()
            candidate_id = candidate_obj.get_candidate_id(username, password)
            print("candidate id : ",str(candidate_id))
            request.json['candidate_id'] = candidate_id
            request.json['username'] = username
            request.json['password'] = password
            can=candidate_obj.add_candidate(request)
            print("new aaplicatiob added " ,can)
            print(type(can))
            return jsonify({'message': 'Candidate inserted successfully'})
        else:
            return jsonify({'message': 'You are not logged in'})
    
       
    except Exception as e:
        print('Error:', str(e))
        return jsonify({'message': 'An error occurred'})


@app.route('/delete', methods=['POST'])
def delete_cand():
    _json = request.json
    candidate_id=_json['candidate_id']
    print(candidate_id)
    try:
        if 'username' in session : 
            can=Manager_users()
            data=can.delete_candidate(candidate_id)
            print("Delete candidate ")

            return jsonify({'message': 'Candidate id deleted successfully'})
        else:
            return jsonify({'message': 'Error deleting candidate'})
    
    except Exception as e:
        print('Error:', str(e))
        return jsonify({'message': 'An error occurred'})
  
@app.route('/edit_candidate', methods=['POST'])
def edit_candidate():
    try:
        if 'username' in session : 
            candidate_obj = Manager_users()
            candidate_obj.edit_candidate(request)         
            return jsonify({'message': 'Candidate updated successfully'})

        else:
            return jsonify({'message': 'You are not logged in'})
    
    except Exception as e:
        print('Error:', str(e))
        return jsonify({'message': 'An error occurred'})

# Handle the file upload
@app.route('/upload_cv', methods=['POST'])
def upload_cv():
    # Get the uploaded file
    cv_file = request.files['cv']

    # Read the file content as bytes
    cv_content = cv_file.read()

    # Connect to the PostgreSQL database
    conn = psycopg2.connect(database='your_database', user='your_user', password='your_password', host='your_host', port='your_port')
    cursor = conn.cursor()

    # Insert the binary data into the table
    cursor.execute("INSERT INTO cv_table (cv_data) VALUES (%s)", (psycopg2.Binary(cv_content),))

    # Commit the transaction and close the connection
    conn.commit()
    conn.close()

    return 'CV file uploaded successfully'

@app.route('/register', methods=['GET', 'POST'])
def register():
    
    can=Candidate_users().sign_up(request)
    print("Successfully signed up...")

    #return redirect(url_for('login'))
    return jsonify("Successfully signed up...")

if __name__=='__main__':
    app.run(debug=True)
    #app.run(host='localhost', port=5173)


