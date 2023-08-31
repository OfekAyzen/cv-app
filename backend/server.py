import string
from flask import Flask, render_template, flash, redirect, url_for, request,jsonify,session,send_file
from flask_sqlalchemy import SQLAlchemy
from werkzeug.utils import secure_filename
import os
#import magic
from validate_email import validate_email
import phonenumbers
import urllib.request
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy import func
from sqlalchemy.orm import Session  
from sqlalchemy.exc import NoResultFound
import psycopg2 #pip install psycopg2 
import psycopg2.extras
import secrets
from pathlib import Path
from datetime import timedelta
import config
from datetime import datetime
from flask_cors import CORS
from database import db
from Manager import Manager
from Candidates import Candidate
from Cv import CV
from Jobs import Jobs
from Application import Application
import re
from flask_mail import Mail, Message
import json
from flask import Flask, request, jsonify
from datetime import datetime, timedelta, timezone
from flask_jwt_extended import create_access_token,get_jwt,get_jwt_identity, \
                               unset_jwt_cookies, jwt_required, JWTManager

app = Flask(__name__)
 
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
app.config['SQLALCHEMY_DATABASE_URI'] = config.SQLALCHEMY_DATABASE_URI
db.init_app(app)
app.config["JWT_SECRET_KEY"] = "please-remember-to-change-me"
jwt = JWTManager(app)

SECRET_FILE_PATH = Path(".flask_secret")
try:
    with SECRET_FILE_PATH.open("r") as secret_file:
        app.secret_key = secret_file.read()
except FileNotFoundError:
    # Let's create a cryptographically secure code in that file
    with SECRET_FILE_PATH.open("w") as secret_file:
        app.secret_key = secrets.token_hex(32)
        secret_file.write(app.secret_key) 
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(minutes=90)

CORS(app,supports_credentials=True, resources={r"/*": {"origins": "http://localhost:5173", "methods": ["GET", "POST","DELETE"]}})



app.config['UPLOAD_FOLDER'] = '/Users/User/CVManagment-App/CV-Management-App/backend/uploads'  # Adjust this path to upload cv for candidates

ALLOWED_EXTENSIONS = {'pdf','word'}
  

@app.after_request
def refresh_expiring_jwts(response):

    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=90))
       # response.headers['Access-Control-Allow-Credentials'] = 'true'
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            data = response.get_json()
            if type(data) is dict:
                data["access_token"] = access_token 
                response.data = json.dumps(data)
        return response
    except (RuntimeError, KeyError):
        # Case where there is not a valid JWT. Just return the original respone
        
        return response
    
    
@app.route('/token', methods=["POST"])
def create_token():
    data = request.json
    username = data.get("username", None)
    password = data.get("password", None)
    
    # Replace this with your database query to validate user credentials

    # set the candidate_id, username, and password in the session
    candidate_id = get_candidate_id_from_database(username, password)
    user_id=get_user_id_from_database(username,password)
    role = check_login(username, password)
    
    if role == 'manager':  
        session['loggedin'] = True
        session['role'] = 'manager'
        session['user_id']=user_id
        session['username'] = username
        #response = jsonify({'role': role, 'user_id': user_id})
        print("username : ",username , " role : ",role ,"id : ",user_id)
        
        access_token = create_access_token(identity={'username': username, 'candidate_id': user_id,'role':role})

        response = {"access_token": access_token,'role': role,'username': username, 'user_id': user_id}
        return response,200
       # response.set_cookie('login_cookie', 'user_logged_in')
      
    elif role == 'candidate':
        session['loggedin'] = True
        session['role'] = 'candidate'
        session['candidate_id'] = candidate_id
        session['username'] = username
        session['password'] = password
        
        access_token = create_access_token(identity={'username': username, 'candidate_id': candidate_id,'role':role})

        #response = jsonify({'candidate_id': candidate_id, 'username': username, 'role': role})

        # Set the login cookie in the response
     #   response.set_cookie('login_cookie', 'user_logged_in')
        #access_token = create_access_token(identity=username)
        response = {"access_token": access_token,'candidate_id': candidate_id, 'username': username, 'role': role}
        return response,200
        #return response, 200
        # Redirect to the home page with candidate data
        #return redirect(url_for('home', candidate_id=candidate_id, username=username))
    else:
        return jsonify({'message': 'Incorrect password or username...'}), 401
   
   

@app.route("/lgout", methods=["POST"])
def lgout():

    session.clear()
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response

@app.route('/profile')
@jwt_required()
def my_profile():
    response_body = {
        "name": "Nagato",
        "about" :"Hello! I'm a full stack developer that loves python and javascript"
    }

    return response_body

        
@app.route('/')
def index():
    #return render_template('index.html')
    print("index ...")
    return jsonify("indexx")

# Configure Flask-Mail
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False
app.config['MAIL_USERNAME'] = 'tech19yeruham@gmail.com'  # Replace with your Gmail email address
app.config['MAIL_PASSWORD'] = 'wjmkebrmobgmhwgl'  # Replace with your Gmail password


mail = Mail(app)

# Function to generate a random password
def generate_random_password(length=12):
    password_characters = string.ascii_letters + string.digits + string.punctuation
    password = ''.join(secrets.choice(password_characters) for i in range(length))
    return password

@app.route('/forgot_password', methods=['POST'])
def forgot_password():
    data = request.json
    username = data['username']

    # Check if the candidate exists in the database
    candidate = Candidate.query.filter_by(username=username).first()
    if not candidate:
        return jsonify({'message': 'Candidate not found.'}), 404

    # Generate a new password
    new_password = generate_random_password()

    # Update the candidate's password in the database
    candidate.password = generate_password_hash(new_password)
    db.session.commit()

    # Send an email to the candidate with the new password
    try:
        # Create a Flask-Mail Message object
        msg = Message(
            subject='Password Reset',  # Subject of the email
            recipients=[candidate.email],  # List of email recipients
            sender=app.config['MAIL_USERNAME'],  # Sender's email address (your Gmail email)
            body=f'Your new password to connect tech 19 account is: {new_password}'  # Body of the email
        )

        # Send the email using the Mail object
        mail.send(msg)

        return jsonify({'message': 'Password reset successful. Check your email for the new password.'})
    except Exception as e:
        print("Error sending email:", e)
        return jsonify({'message': 'Error sending email. Please try again later.'}), 500


@app.route('/signup', methods=['POST'])
def signup():
    data = request.json

    
    # Check if all required fields are present and not empty in the request data
    required_fields = ['first_name', 'last_name', 'email', 'phone_number', 'username', 'password']
    for field in required_fields:
        if field not in data or not data[field]:
            return jsonify({'message': f'Missing or empty required field: {field}.'}), 400

    first_name = data['first_name']
    last_name = data['last_name']
    email = data['email']
    phone_number = data['phone_number']
    username = data['username']
    password = data['password']
  
    # Check if the email is valid
    if not is_valid_email(email):
        return jsonify({'message': 'Invalid email address.'}), 400

    # Check if the username is available (not already taken)
    if is_username_taken(username):
        return jsonify({'message': 'Username is already taken. Please choose a different one.'}), 400

    # Check if the password meets the minimum requirements (e.g., minimum length)
    if len(password) < 8:
        return jsonify({'message': 'Password must be at least 8 characters long.'}), 400

    # Hash the password before saving it to the database
    hashed_password = generate_password_hash(password)
    candidate_id = generate_candidate_id()

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
            position=None,
            certifications=None,
        )

        # Add the new candidate to the session
        db.session.add(new_candidate)

        # Commit the transaction to persist the new candidate to the database
        db.session.commit()
        

        return jsonify({'message': 'Signup successful!'}), 201
    except Exception as e:
        db.session.rollback()
        print("e", e)
        return jsonify({'message': 'Error occurred during signup.'}), 500

def is_valid_email(email):
    # Basic email format validation using regex
    email_pattern = r'^[\w\.-]+@[\w\.-]+\.\w+$'
    return re.match(email_pattern, email)

def is_username_taken(username):
    # Check if the username is already in the database
    existing_candidate = Candidate.query.filter_by(username=username).first()
    return existing_candidate is not None
    
def generate_job_id():
    # maximum candidate_id value from the database
    max_job_id = db.session.query(func.max(Jobs.job_id)).scalar()

    # Increment the maximum candidate_id by 1 to generate a new candidate ID
    candidate_id = max_job_id + 1 if max_job_id else 1

    return candidate_id
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

def generate_application_id():
    # maximum candidate_id value from the database
    max_application_id = db.session.query(func.max(Application.application_id)).scalar()

    # Increment the maximum candidate_id by 1 to generate a new candidate ID
    application_id = max_application_id + 1 if max_application_id else 1

    return application_id

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS



@app.route('/upload', methods=['POST'])
@jwt_required()
def upload():
    try:
        candidate_id = get_jwt_identity()['candidate_id']

        file = request.files['inputFile']
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)

        if file and allowed_file(file.filename):
            # Check if the file already exists
            if os.path.exists(file_path):
                # If the file exists, delete the existing file
                os.remove(file_path)

            file.save(file_path)

            # Create or update the CV entry in the database
            existing_cv = CV.query.filter_by(candidate_id=candidate_id).first()
            if existing_cv:
                existing_cv.file_path = file_path
                existing_cv.upload_date = datetime.utcnow()
                existing_cv.status = 'Pending'
            else:
                new_cv = CV(
                    cv_id=generate_cv_id(),
                    candidate_id=candidate_id,
                    file_path=file_path,
                    upload_date=datetime.utcnow(),
                    status='Pending'
                )
                db.session.add(new_cv)

            db.session.commit()
            
            return jsonify({'message': 'File successfully uploaded.'}), 200
        else:
            return jsonify({'message': 'Invalid Upload, only word and pdf files are allowed'}), 400

    except Exception as e:
        db.session.rollback()
        print("error:", e)
        return jsonify({'message': 'Error occurred during file upload.'}), 500

#fomat phone number
def format_israeli_phone_number(phone_number_str):
    # Remove all non-digit characters from the phone number
    digits = ''.join(filter(str.isdigit, phone_number_str))

    # Check if the phone number has at least 9 digits
    if len(digits) >= 9:
        # Format the phone number as "XXX-XXX-XXXX"
        formatted_phone = f"{digits[:3]}-{digits[3:6]}-{digits[6:]}"
        return formatted_phone
    else:
        return None

@app.route('/add_candidate', methods=['POST'])
@jwt_required()
def add_candidate():
    try:
        data = request.json
        app.logger.info("Received data: %s", data)  # Add this line for logging

        required_fields = [
            'first_name', 'last_name', 'location', 'email', 'phone_number',
            'gender', 'education', 'work_experience', 'skills', 'position', 'certifications'
        ]

        for field in required_fields:
            if field not in data:
                return jsonify({'message': f'Missing {field} field.'}), 400

        first_name = data['first_name']
        last_name = data['last_name']
        location = data['location']
        email = data['email']
        phone_number = data['phone_number']
        gender = data['gender']
        education = data['education']
        work_experience = data['work_experience']
        skills = data['skills']
        position = data['position']
        certifications = data['certifications']

        # Check if email is valid
        if not validate_email(email):
            return jsonify({'message': 'Invalid email address.'}), 400

        # Check if phone number is valid
        formatted_phone = format_israeli_phone_number(phone_number)
        if not formatted_phone:
            return jsonify({'message': 'Invalid phone number.'}), 400

        username_data = get_jwt_identity()
        username = username_data['username']
        existing_candidate = Candidate.query.filter_by(username=username).first()
        if not existing_candidate:
            return jsonify({'message': 'Candidate not found.'}), 404

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
        existing_candidate.position = position
        existing_candidate.certifications = certifications

        db.session.commit()

        return jsonify({'message': 'Job application added successfully!'})

    except Exception as e:
        db.session.rollback()
        app.logger.error("Error: %s", e)
        print("Error:", e)
        return jsonify({'message': 'Error occurred during job application.'}), 500

def get_candidate_id_from_database(username, password):
    try:

        data = request.json
        app.logger.info("Received data: %s", data)  # Add this line for logging

        # find the candidate with  username
        candidate = Candidate.query.filter_by(username=username).one()

        #  password matches 
        if check_password_hash(candidate.password, password):
            return candidate.candidate_id
        else:
            return None
    except NoResultFound:
        
        return None

def get_user_id_from_database(username, password):
    try:
        # find the user with  username
        user = Manager.query.filter_by(username=username).one()

        #  password matches 
        if check_password_hash(user.password, password):
            return user.user_id
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
@jwt_required()
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
    


#edit candidate for manager 
@app.route('/edit_candidate/<int:candidate_id>', methods=['POST'])
@jwt_required()
def edit_candidate(candidate_id):

    if 'loggedin' not in session or session['role'] != 'manager':
       
        return jsonify({'message': 'You are not logged in as a candidate.'}), 401
    
    
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
        candidate.position = data.get('position', candidate.position)
        candidate.certifications = data.get('certifications', candidate.certifications)

        db.session.commit()

        return jsonify({'message': 'Candidate updated successfully.'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'Error occurred during candidate update.'}), 500



@app.route('/view_all_candidates', methods=['GET'])
@jwt_required()
def view_all_candidates():
    try:
        # Get the current user's identity (username) from the JWT token
        current_user = get_jwt_identity()

        # Check if the user's role is 'manager'
        if current_user['role'] != 'manager':
            return jsonify({'message': 'You are not logged in as a manager.'}), 401

        # Get all the candidates from the database
        all_candidates = Candidate.query.all()

        # Create a list to store candidate details
        candidate_list = []

        # Loop through each candidate and add its details to the list
        for candidate in all_candidates:
            # Fetch the applied job applications for the candidate
            applied_jobs = Application.query.filter_by(candidate_id=candidate.candidate_id).all()
            print("applied job ",applied_jobs)
            # Create a list to store applied job details
            applied_jobs_list = []
            for application in applied_jobs:
                # Fetch job details using job_id
                job = Jobs.query.filter_by(job_id=application.job_id).first()
                if job:
                    applied_job_details = {
                        'job_id': application.job_id,
                        'job_title': job.job_title,  # Include job title
                        'status': application.status,
                        'application': application.application_id,
                        'application_date':application.application_date,
                        'notes':application.notes,
                    }
                    applied_jobs_list.append(applied_job_details)

            candidate_details = {
                'candidate_id': candidate.candidate_id,
                'first_name': candidate.first_name,
                'last_name': candidate.last_name,
                'gender': candidate.gender,
                'education': candidate.education,
                'work_experience': candidate.work_experience,
                'skills': candidate.skills,
                'location': candidate.location,
                'email': candidate.email,
                'phone_number': candidate.phone_number,
                'position': candidate.position,
                'certifications': candidate.certifications,
                'applied': True if applied_jobs else False,  # Set applied status
                'appliedJobs': applied_jobs_list,  # Include list of applied job applications
                
            }

            candidate_list.append(candidate_details)

        return jsonify({'candidates': candidate_list})

    except Exception as e:
        print("Error:", e)
        return jsonify({'message': 'Error occurred while fetching candidates.'}), 500





#adding job application after candidate is loggedin
@app.route('/add_job', methods=['POST'])
@jwt_required()
def add_job():
    current_user_role = get_jwt_identity().get('role')

    if current_user_role != 'manager':
        return jsonify({'message': 'You are not authorized to perform this action.'}), 401

    data = request.json
    job_title = data['job_title']
    job_description = data['job_description']
    qualifications = data['qualifications']
    job_id = generate_job_id()  # Make sure to implement this function
    
    try:
        new_job = Jobs(
            job_title=job_title,
            job_description=job_description,
            qualifications=qualifications,
            job_id=job_id
        )
        db.session.add(new_job)
        db.session.commit()

        return jsonify({'message': 'New job added successfully!'}), 201
    except Exception as e:
        db.session.rollback()
        print("error:", e)
        return jsonify({'message': 'Error occurred during adding new job.'}), 500
    
@app.route('/show_notes/<int:job_id>', methods=['GET'])
@jwt_required()  # Requires JWT authentication
def show_notes(job_id):
    try:
        current_user = get_jwt_identity()

        # Find the application by application_id
        application = Application.query.filter_by(job_id=job_id).first()

        if not application:
            return jsonify({'message': 'Application not found.'}), 404

        # Check if the user's role is 'manager'
        if current_user['role'] != 'manager':
            return jsonify({'message': 'You are not authorized to view notes.'}), 403

        # Get the notes associated with the application
        notes = application.notes

        return jsonify({'notes': notes}), 200

    except Exception as e:
        print("Error:", e)
        return jsonify({'message': 'An error occurred.'}), 500
#add note for the apply
@app.route('/add_note', methods=['POST'])
@jwt_required()  # Requires JWT authentication
def add_note():
    try:
        current_user = get_jwt_identity()

        job_id = request.json.get('job_id')  # Correct field name
        note_text = request.json.get('note')

        if not job_id or not note_text:
            return jsonify({'message': 'Both job_id and note are required.'}), 400

        job_application = Application.query.filter_by(job_id=job_id).first()

        if not job_application:
            return jsonify({'message': 'Job application not found.'}), 404

        if current_user['role'] != 'manager':
            return jsonify({'message': 'You are not authorized to add notes.'}), 403

        # Update the notes attribute of the job application
        job_application.notes = note_text
        db.session.commit()

        return jsonify({'message': 'Note added successfully.'}), 200

    except Exception as e:
        print("Error:", e)
        db.session.rollback()
        return jsonify({'message': 'An error occurred.'}), 500
#edit job posting  
@app.route('/delete_job/<int:job_id>', methods=['DELETE'])
@jwt_required()
def delete_job(job_id):
    current_user_role = get_jwt_identity().get('role')

    if current_user_role != 'manager':
        return jsonify({'message': 'You are not authorized to perform this action.'}), 401

    try:
        job = Jobs.query.get(job_id)
        if job:
            db.session.delete(job)
            db.session.commit()
            return jsonify({'message': 'Job deleted successfully'}), 200
        else:
            return jsonify({'message': 'Job not found'}), 404
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'Error occurred while deleting position.'}), 500


#delete job application for manager 
@app.route('/delete_application/<int:application_id>', methods=['DELETE'])
@jwt_required()
def delete_application(application_id):
    current_user_role = get_jwt_identity().get('role')

    if current_user_role != 'manager':
        return jsonify({'message': 'You are not authorized to perform this action.'}), 401

    try:
        application = Application.query.get(application_id)
        if application:
            db.session.delete(application)
            db.session.commit()
            return jsonify({'message': 'Application deleted successfully'}), 200
        else:
            return jsonify({'message': 'Application not found'}), 404
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'Error occurred while deleting application.'}), 500

@app.route('/edit_job/<int:job_id>', methods=['POST'])
@jwt_required()  # Requires a valid JWT to access this route
def edit_job(job_id):
    # Your authentication logic here
    # ...

    data = request.json

    try:
        # Check if the candidate with the given candidate_id exists
        job = Jobs.query.get(job_id)

        if not job:
            return jsonify({'message': 'Position is not found.'}), 404

        # Update the job's information with the new data
        job.job_title = data.get('job_title', job.job_title)
        job.job_description = data.get('job_description', job.job_description)
        job.qualifications = data.get('qualifications', job.qualifications)

        db.session.commit()

        return jsonify({'message': 'Position updated successfully.'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'Error occurred during position update.'}), 500
@app.route('/view_jobs', methods=['GET'])

def view_jobs():
   
    try:
        # Get all the jobs from the database
        all_jobs = Jobs.query.all()

        # Create a list to store job details
        jobs_list = []

        # Loop through each job and add its details to the list
        for job in all_jobs:
            job_details = {
                'job_id': job.job_id,
                'job_title': job.job_title,
                'job_description': job.job_description,
                'qualifications': job.qualifications
            }
            jobs_list.append(job_details)

        return jsonify(jobs_list)

    except Exception as e:
        print("Error:", e)
        return jsonify({'message': 'Error occurred while fetching jobs.'})



@app.route('/apply/<int:job_id>', methods=['POST'])
@jwt_required()
def apply(job_id):
    try:
        # Check if the job_id exists in the Jobs table
        job = Jobs.query.get(job_id)
        if not job:
            return jsonify({'message': 'Job not found in the database.'}), 404

        # Get the candidate_id from the JWT token
        candidate_id = get_jwt_identity()['candidate_id']
        if not candidate_id:
            return jsonify({'message': 'Candidate ID not found in the JWT token.'}), 401

        # Check if the candidate already applied for the job
        existing_application = Application.query.filter_by(job_id=job_id, candidate_id=candidate_id).first()

        # Get the candidate's CV ID
        cv_entry = CV.query.filter_by(candidate_id=candidate_id).first()
        if not cv_entry:
            return jsonify({'message': 'CV not found for the candidate.'}), 404

        cv_id = cv_entry.cv_id

        if existing_application:
            # If the candidate already applied, update the application
            existing_application.cv_id = cv_id
            existing_application.status = 'Pending'  # Update the status
        else:
            # If the candidate is applying for the first time, create a new application
            new_application = Application(
                application_id=generate_application_id(),
                job_id=job_id,
                candidate_id=candidate_id,
                cv_id=cv_id,
                application_date=datetime.utcnow(),
                status='Pending'
            )

            db.session.add(new_application)

        db.session.commit()

        return jsonify({'message': 'Application submitted successfully!'})

    except Exception as e:
        db.session.rollback()
        print("error:", e)
        return jsonify({'message': 'Error occurred during application submission.'}), 500
#manager can see the applied status of each job that candidate are applican to it
@app.route('/candidate_applied_status', methods=['GET'])
@jwt_required()
def candidate_applied_status():
    try:
        # Get the candidate_id from the JWT token
        candidate_id = get_jwt_identity()['candidate_id']
        if not candidate_id:
            return jsonify({'message': 'Candidate ID not found in the JWT token.'}), 401

        # Query the database for the applied status of the candidate's applications
        applied_status = {}
        applications = Application.query.filter_by(candidate_id=candidate_id).all()
        for application in applications:
            applied_status[application.job_id] = {
                'status': application.status,
                'job_title': application.job.title
            }

        return jsonify({'applied_status': applied_status})

    except Exception as e:
        print("Error:", e)
        return jsonify({'message': 'Error occurred while fetching applied status.'}), 500


@app.route('/view_applyed/<int:candidate_id>', methods=['GET'])
@jwt_required()
def view_applyed(candidate_id):
    print("View applied positions")
    
    try:
        # Get the current user's identity (username) from the JWT token
       
       
       
        # Check if the candidate_id exists in the database
        candidate = Candidate.query.filter_by(candidate_id=candidate_id).first()
        if not candidate:
            print("Candidate not found")
            return jsonify({'message': 'Candidate not found.'}), 404
        
        candidate_applications = Application.query.filter_by(candidate_id=candidate_id).all()
        application_list = []

        # Loop through each application and add its details to the list
        for application in candidate_applications:
            application_details = {
                'job_id': application.job_id,
                'application_id': application.application_id,
                'status': application.status,
                'application_date': application.application_date.strftime('%Y-%m-%d %H:%M:%S')
            }
            application_list.append(application_details)

        # Get all the jobs corresponding to the applications
        job_ids = [app.job_id for app in candidate_applications]
        all_jobs = Jobs.query.filter(Jobs.job_id.in_(job_ids)).all()

        # Create a list to store job details
        jobs_list = []

        # Loop through each job and add its details to the list
        for job in all_jobs:
            job_details = {
                'job_id': job.job_id,
                'job_title': job.job_title,
                'job_description': job.job_description,
                'qualifications': job.qualifications
            }
            jobs_list.append(job_details)

        return jsonify({'applications': application_list, 'jobs': jobs_list})

    except Exception as e:
        print("Error:", e)
        return jsonify({'message': 'Error occurred while fetching applications.'})


@app.route('/update_status', methods=['POST'])
@jwt_required()
def update_status():
    try:
        data = request.get_json()
        job_id = data.get('job_id')  # Change the field name to 'job_id'
        new_status = data.get('status')

        print("Received job_id:", job_id)  # Update the log message for clarity

        if job_id is None or new_status is None:
            return jsonify({'message': 'Invalid data.'}), 400

        job_application = Application.query.filter_by(job_id=job_id).first()
        if not job_application:
            return jsonify({'message': 'Job application not found.'}), 404

        job_application.status = new_status
        db.session.commit()

        return jsonify({'message': 'Status updated successfully!'})

    except Exception as e:
        db.session.rollback()
        print("Error:", e)
        return jsonify({'message': 'Error updating status.'}), 500


@app.route('/view_all_applications', methods=['GET'])
@jwt_required()
def view_all_applications():
    try:
        # Get the current user's identity (username) from the JWT token
        current_user = get_jwt_identity()

        # Check if the user's role is 'manager'
        if current_user['role'] != 'manager':
            return jsonify({'message': 'You are not logged in as a manager.'}), 401

        # Get all the applications from the database
        all_applications = Application.query.all()

        # Create a list to store application details
        application_list = []

        # Loop through each application and add its details to the list
        for application in all_applications:
            application_details = {
                'application_id': application.application_id,
                'job_id': application.job_id,
                'candidate_id': application.candidate_id,
                'cv_id': application.cv_id,
                'status': application.status,
                'application_date': application.application_date.strftime('%Y-%m-%d %H:%M:%S')
            }
            application_list.append(application_details)

        return jsonify({'applications': application_list})

    except Exception as e:
        print("Error:", e)
        return jsonify({'message': 'Error occurred while fetching applications.'}), 500


#download cv file for manager
@app.route('/download/<int:candidate_id>', methods=['GET'])

def download(candidate_id):
   
    # Retrieve the CV record from the database based on candidate_id
    cv = CV.query.filter_by(candidate_id=candidate_id).first()
    if not cv or not cv.cv_id:
        return jsonify({'message': 'CV not found.'}), 404


    # Return the file to download
    return send_file(cv.file_path, as_attachment=True)


if __name__ == '__main__':
    app.run(debug=True)