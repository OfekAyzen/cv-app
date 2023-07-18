from flask import Flask, render_template, flash, redirect, url_for, request,jsonify,session
from flask_sqlalchemy import SQLAlchemy
from werkzeug.utils import secure_filename
import os
#import magic
import urllib.request
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy import func
from sqlalchemy.orm import Session  
from sqlalchemy.exc import NoResultFound
import psycopg2
import psycopg2.extras
import secrets
from pathlib import Path
from datetime import timedelta
import config
from datetime import datetime
from flask_cors import CORS

app = Flask(__name__)
 
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
app.config['SQLALCHEMY_DATABASE_URI'] = config.SQLALCHEMY_DATABASE_URI
db=SQLAlchemy(app)

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

app.config['UPLOAD_FOLDER'] = '/Users/User/CVManagment-App/CV-Management-App/backend/uploads'  # Adjust this path

ALLOWED_EXTENSIONS = {'pdf'}
  

class Manager(db.Model):
    __tablename__ = 'users'
    user_id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40))
    password = db.Column(db.String(40))
    email = db.Column(db.String(40))
    role = db.Column(db.String(20))

    def __init__(self,user_id, username, password, email, role):
        self.user_id=user_id
        self.username = username
        self.password = password
        self.email = email
        self.role = role

class Candidate(db.Model):
    __tablename__ = 'candidate'
    candidate_id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(40))
    last_name = db.Column(db.String(40))
    location = db.Column(db.String(100))
    email = db.Column(db.String(100))
    phone_number = db.Column(db.String(20))
    gender = db.Column(db.String(10))
    education = db.Column(db.String(100))
    work_experience = db.Column(db.String(100))
    skills = db.Column(db.String(200))
    department = db.Column(db.String(100))
    certifications = db.Column(db.String(200))
    username = db.Column(db.String(40))
    password = db.Column(db.String(40))
    role = db.Column(db.String(20))

    def __init__(self, candidate_id, first_name, last_name, location, email, phone_number, gender, education,
                 work_experience, skills, department, certifications, username, password, role='candidate'):
        self.candidate_id = candidate_id
        self.first_name = first_name
        self.last_name = last_name
        self.location = location
        self.email = email
        self.phone_number = phone_number
        self.gender = gender
        self.education = education
        self.work_experience = work_experience
        self.skills = skills
        self.department = department
        self.certifications = certifications
        self.username = username
        self.password = password
        self.role = role

class CV(db.Model):
    __tablename__ = 'cv'
    cv_id = db.Column(db.Integer, primary_key=True)
    candidate_id = db.Column(db.Integer, db.ForeignKey('candidate.candidate_id'))
    file_path = db.Column(db.String(150))
    upload_date = db.Column(db.DateTime, default=datetime.utcnow)
    status = db.Column(db.String(20), default='Pending')

    def __init__(self,cv_id,candidate_id,file_path,upload_date,status):
        self.cv_id = cv_id
        self.candidate_id = candidate_id
        self.file_path = file_path
        self.upload_date = upload_date
        self.status = status
        
@app.route('/')
def index():
    #return render_template('index.html')
    print("index ...")
    return jsonify("indexx")





@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    first_name = data['first_name']
    last_name = data['last_name']
    email = data['email']
    phone_number = data['phone_number']
    username = data['username']
    password = data['password']

    # Hash the password before saving it to the database
    hashed_password = generate_password_hash(password)
    candidate_id=generate_candidate_id()
    try:
        new_candidate = Candidate(
            candidate_id=candidate_id,
            first_name=first_name,
            last_name=last_name,
            location=None,
            email=email,
            phone_number=phone_number,
            username=username,
            password=hashed_password,
            gender=None,
            education=None,
            work_experience=None,
            skills=None,
            department=None,
            certifications=None,
        )

        # Add the new candidate to the session
        db.session.add(new_candidate)

        # Commit the transaction to persist the new candidate to the database
        db.session.commit()

        return jsonify({'message': 'Signup successful!'})
    except Exception as e:
        db.session.rollback()
        print("e",e)
        return jsonify({'message': 'Error occurred during signup.'})
    

def generate_candidate_id():
    # maximum candidate_id value from the database
    max_candidate_id = db.session.query(func.max(Candidate.candidate_id)).scalar()

    # Increment the maximum candidate_id by 1 to generate a new candidate ID
    candidate_id = max_candidate_id + 1 if max_candidate_id else 1

    return candidate_id

def generate_cv_id():
    # maximum candidate_id value from the database
    max_cv_id = db.session.query(func.max(CV.cv_id)).scalar()

    # Increment the maximum candidate_id by 1 to generate a new candidate ID
    cv_id = max_cv_id + 1 if max_cv_id else 1

    return cv_id

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def Upload_file(candidate_id):
    print("Upload file for candidate number : ",candidate_id)
    new_cv = CV(
                candidate_id=candidate_id,
                cv_id = generate_cv_id(),
                file_path = None,
                upload_date = None,
                status = None
            )
    db.session.add(new_cv)
    db.session.commit()
    try:
        
        # Insert CV data into the cv table
        cv_file = request.files.get('cv_file')
        if cv_file and allowed_file(cv_file.filename):
            filename = secure_filename(cv_file.filename)
            file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            cv_file.save(file_path)

            new_cv = CV(
                candidate_id=candidate_id,
                file_path=file_path
            )
            db.session.add(new_cv)

        db.session.commit()

        return jsonify({'message': 'Candidate CV added successfully!'})
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'Error occurred during candidate and CV addition.'})


#adding job application after candidate is loggedin
@app.route('/add_candidate', methods=['POST'])
def add_candidate():
    if 'loggedin' not in session or session['role'] != 'candidate':
        print("not loggedin")
        return jsonify({'message': 'You are not logged in as a candidate.'}), 401

    candidate_id = session['candidate_id']
    print("candidate id :",candidate_id)
    username = session['username']
    password = session['password']

    data = request.json
    first_name = data['first_name']
    last_name = data['last_name']
    location = data['location']
    email = data['email']
    phone_number = data['phone_number']
    gender = data['gender']
    education = data['education']
    work_experience = data['work_experience']
    skills = data['skills']
    department = data['department']
    certifications = data['certifications']

    try:
        # Check if the candidate_id already exists in the database
        existing_candidate = Candidate.query.get(candidate_id)

        if existing_candidate:
            # Update the existing candidate's information
            existing_candidate.first_name = first_name
            existing_candidate.last_name = last_name
            existing_candidate.location = location
            existing_candidate.email = email
            existing_candidate.phone_number = phone_number
            existing_candidate.gender = gender
            existing_candidate.education = education
            existing_candidate.work_experience = work_experience
            existing_candidate.skills = skills
            existing_candidate.department = department
            existing_candidate.certifications = certifications
            Upload_file(candidate_id)
            
        else:
            # Insert a new candidate with the provided candidate_id
            new_candidate = Candidate(
                candidate_id=candidate_id,
                first_name=first_name,
                last_name=last_name,
                location=location,
                email=email,
                phone_number=phone_number,
                gender=gender,
                education=education,
                work_experience=work_experience,
                skills=skills,
                department=department,
                certifications=certifications
                
            )
            Upload_file(candidate_id)
            db.session.add(new_candidate)

        db.session.commit()

        return jsonify({'message': 'Job application added successfully!'})
    except Exception as e:
        db.session.rollback()
        print("eror : ",e)
        return jsonify({'message': 'Error occurred during job application.'})

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data['username']
    password = data['password']
    
    # set the candidate_id, username, and password in the session
    candidate_id = get_candidate_id_from_database(username, password)

    role = check_login(username, password)
    
    if role == 'manager':
        session['loggedin'] = True
        session['role'] = 'manager'
        return jsonify({'message': 'Logged in as manager ...'})
    elif role == 'candidate':
        
        session['loggedin'] = True
        session['role'] = 'candidate'
        session['candidate_id'] = candidate_id
        session['username'] = username
        session['password'] = password
        return jsonify({'message': 'Logged in as candidate'})
    else:
        return jsonify({'message': 'Incorrect username or password'})

def get_candidate_id_from_database(username, password):
    try:
        # find the candidate with  username
        candidate = Candidate.query.filter_by(username=username).one()

        #  password matches 
        if check_password_hash(candidate.password, password):
            return candidate.candidate_id
        else:
            return None
    except NoResultFound:
        
        return None



def check_login(username, password):
    # check the username and password
    manager = Manager.query.filter_by(username=username).first()
    print("manager = ",manager)
    if manager and manager.role == 'manager' and check_password_hash(manager.password, password):
        print("role = ",manager.role)
        return 'manager'
    
    candidate = Candidate.query.filter_by(username=username).first()
    if candidate and candidate.role == 'candidate' and check_password_hash(candidate.password, password):
        print("role = ",candidate.role)
        return 'candidate'
    
    return None


@app.route('/delete_candidate/<int:candidate_id>', methods=['DELETE'])
def delete_candidate(candidate_id):
    # Check if the user is logged in and is a manager
    if 'loggedin' in session and session['loggedin'] and 'role' in session and session['role'] == 'manager':
        print("manager delete candidate")
        try:
            candidate = Candidate.query.get(candidate_id)
            if candidate:
                # Delete the candidate from the db
                db.session.delete(candidate)
                db.session.commit()
                return jsonify({'message': 'Candidate deleted successfully'})
            else:
                return jsonify({'message': 'Candidate not found'})
        except Exception as e:
            db.session.rollback()
            return jsonify({'message': 'Error occurred while deleting candidate.'})
    else:
        return jsonify({'message': 'You are not authorized to perform this action.'})
    

@app.route('/logout', methods=['POST'])
def logout():
    # Clear the session data
    session.clear()
    return jsonify({'message': 'Logged out successfully'})


@app.route('/filter_candidates', methods=['POST'])
def filter_candidates():
    data = request.get_json()
    filters = {}
    
    # Extract the filters from the request body
    education = data.get('education')
    gender = data.get('gender')
    work_experience = data.get('work_experience')
    
    # Add filters to the 'filters' dictionary if they are provided
    if education:
        filters['education'] = education
    if gender:
        filters['gender'] = gender
    if work_experience:
        filters['work_experience'] = work_experience

    try:
        # Query the database using the filters provided
        candidates = Candidate.query.filter_by(**filters).all()

        # Create a list of dictionaries to hold the filtered candidates' information
        filtered_candidates = []
        for candidate in candidates:
            filtered_candidates.append({
                'candidate_id': candidate.candidate_id,
                'first_name': candidate.first_name,
                'last_name': candidate.last_name,
                'location': candidate.location,
                'email': candidate.email,
                'phone_number': candidate.phone_number,
                'gender': candidate.gender,
                'education': candidate.education,
                'work_experience': candidate.work_experience,
                'skills': candidate.skills,
                'department': candidate.department,
                'certifications': candidate.certifications
            })

        return jsonify({'candidates': filtered_candidates})
    except Exception as e:
        return jsonify({'message': 'Error occurred during filtering candidates.'})



#edit candidate for manager 
@app.route('/edit_candidate/<int:candidate_id>', methods=['POST'])
def edit_candidate(candidate_id):
    data = request.json

    try:
        # Check if the candidate with the given candidate_id exists
        candidate = Candidate.query.get(candidate_id)

        if not candidate:
            return jsonify({'message': 'Candidate not found.'}), 404

        # Update the candidate's information with the new data
        candidate.first_name = data.get('first_name', candidate.first_name)
        candidate.last_name = data.get('last_name', candidate.last_name)
        candidate.location = data.get('location', candidate.location)
        candidate.email = data.get('email', candidate.email)
        candidate.phone_number = data.get('phone_number', candidate.phone_number)
        candidate.gender = data.get('gender', candidate.gender)
        candidate.education = data.get('education', candidate.education)
        candidate.work_experience = data.get('work_experience', candidate.work_experience)
        candidate.skills = data.get('skills', candidate.skills)
        candidate.department = data.get('department', candidate.department)
        candidate.certifications = data.get('certifications', candidate.certifications)

        db.session.commit()

        return jsonify({'message': 'Candidate updated successfully.'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'Error occurred during candidate update.'}), 500



if __name__ == '__main__':
    app.run(debug=True)