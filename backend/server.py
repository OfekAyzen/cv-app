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
from database import db
from Manager import Manager
from Candidates import Candidate
from Cv import CV
from Jobs import Jobs
from Application import Application
import re
app = Flask(__name__)
 
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
app.config['SQLALCHEMY_DATABASE_URI'] = config.SQLALCHEMY_DATABASE_URI
db.init_app(app)

SECRET_FILE_PATH = Path(".flask_secret")
try:
    with SECRET_FILE_PATH.open("r") as secret_file:
        app.secret_key = secret_file.read()
except FileNotFoundError:
    # Let's create a cryptographically secure code in that file
    with SECRET_FILE_PATH.open("w") as secret_file:
        app.secret_key = secrets.token_hex(32)
        secret_file.write(app.secret_key) 
app.config['PERMANENT_SESSION_LIFETIME'] =  timedelta(minutes=30)

CORS(app, resources={r"/*": {"origins": "http://localhost:5173", "methods": ["GET", "POST"]}})

app.config['UPLOAD_FOLDER'] = '/Users/User/CVManagment-App/CV-Management-App/backend/uploads'  # Adjust this path

ALLOWED_EXTENSIONS = {'pdf','word'}
  

        
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
def upload():
    if 'loggedin' not in session or session['role'] != 'candidate':
        print("not loggedin")
        return jsonify({'message': 'You are not logged in as a candidate.'}), 401
    print("UPLOAD")
    print(session)
    # Extract candidate_id from the session
    
    candidate_id = session.get('candidate_id')
    if not candidate_id:
        return jsonify({'message': 'Candidate ID not found in the session.'}), 401

    file = request.files['inputFile']
    
    filename = secure_filename(file.filename)

    if file and allowed_file(file.filename):
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

        # Create a new CV entry in the database
        new_cv = CV(
            cv_id=generate_cv_id(),  # Replace with your logic to generate cv_id
            candidate_id=candidate_id,
            file_path=os.path.join(app.config['UPLOAD_FOLDER'], filename),
            upload_date=datetime.utcnow(),
            status='Pending'
        )
        db.session.add(new_cv)
        db.session.commit()
        flash('File successfully uploaded ' + file.filename + ' to the database!')
        return redirect('/')
    else:
        flash('Invalid Upload, only word, pdf files are allowed') 
        return redirect('/')
    




#adding job application after candidate is loggedin
@app.route('/add_candidate', methods=['POST'])
def add_candidate():
    if 'loggedin' not in session or session['role'] != 'candidate':
        print("not loggedin")
        return jsonify({'message': 'You are not logged in as a candidate.'}), 401

    candidate_id = session['candidate_id']
    print("candidate id :",candidate_id)
    #username = session['username']
    #password = session['password']
    
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
    position = data['position']
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
            existing_candidate.position = position
            existing_candidate.certifications = certifications
            
            
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
                position=position,
                certifications=certifications
                
            )
            
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
    user_id=get_user_id_from_database(username,password)
    role = check_login(username, password)
    
    if role == 'manager':
        
        session['loggedin'] = True
        session['role'] = 'manager'
        session['user_id']=user_id
        print('user id ',user_id)
        return jsonify({'role':role,'user_id' : user_id}) ,200
    elif role == 'candidate':
        session['loggedin'] = True
        session['role'] = 'candidate'
        session['candidate_id'] = candidate_id
        session['username'] = username
        session['password'] = password
        return jsonify({'candidate_id':candidate_id,'username':username,'role':role}) ,200
        # Redirect to the home page with candidate data
        #return redirect(url_for('home', candidate_id=candidate_id, username=username))
    else:
        return jsonify({'message': 'Incorrect password or username...'}), 401

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

#filter by education, work experience, skills, gender and location.
@app.route('/filter_candidates', methods=['POST'])
def filter_candidates():
    if 'loggedin' not in session or session['role'] != 'manager':
        print("not loggedin")
        return jsonify({'message': 'You are not logged in as a candidate.'}), 401

    data = request.get_json()
    filters = {}
    
    # Extract the filters from the request body
    education = data.get('education')
    gender = data.get('gender')
    work_experience = data.get('work_experience')
    location=data.get('location')
    skills=data.get('skills')
    
    # Add filters to the 'filters' dictionary if they are provided
    if education:
        filters['education'] = education
    if gender:
        filters['gender'] = gender
    if work_experience:
        filters['work_experience'] = work_experience
    if location:
        filters['location']=location
    if skills:
        filters['skills']=skills
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
                'position': candidate.position,
                'certifications': candidate.certifications
            })

        return jsonify({'candidates': filtered_candidates})
    except Exception as e:
        return jsonify({'message': 'Error occurred during filtering candidates.'})



#edit candidate for manager 
@app.route('/edit_candidate/<int:candidate_id>', methods=['POST'])
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
def view_all_candidates():
    try:
        # Check if the user is logged in as a manager
        if 'loggedin' not in session or session['role'] != 'manager':
            print("Not logged in as a manager")
            return jsonify({'message': 'You are not logged in as a manager.'}), 401

        # Get all the candidates from the database
        all_candidates = Candidate.query.all()

        # Create a list to store candidate details
        candidate_list = []

        # Loop through each candidate and add their details to the list
        for candidate in all_candidates:
            candidate_details = {
                'candidate_id': candidate.candidate_id,
                'first_name': candidate.first_name,
                'last_name': candidate.last_name,
                'email': candidate.email,
                'location' : candidate.location,
                'phone_number' : candidate.phone_number,
                'gender' : candidate.gender,
                'education' : candidate.education,
                'work_experience' : candidate.work_experience,
                'skills' : candidate.skills,
                'position' : candidate.position,
                'certifications' : candidate.certifications

            }
            candidate_list.append(candidate_details)

        return jsonify({'candidates': candidate_list})

    except Exception as e:
        print("Error:", e)
        return jsonify({'message': 'Error occurred while fetching candidates.'})



#adding job application after candidate is loggedin
@app.route('/add_job', methods=['POST'])
def add_job():
    if 'loggedin' not in session or session['role'] != 'manager':
        print("not loggedin")
        return jsonify({'message': 'You are not logged in as a manager.'}), 401

    
    
    data = request.json
    job_title = data['job_title']
    job_description = data['job_description']
    qualifications = data['qualifications']
    job_id = generate_job_id()
    
    
    try:
        
        new_job = Jobs(
            job_title = job_title,
            job_description  = job_description ,
            qualifications = qualifications,
            job_id = job_id
                
        )
        print("new_jobs : ",new_job)
        db.session.add(new_job)

        db.session.commit()

        return jsonify({'message': 'New job added successfully!'})
    except Exception as e:
        db.session.rollback()
        print("eror : ",e)
        return jsonify({'message': 'Error occurred during added new job.'})

#edit job posting  
@app.route('/delete_job/<int:job_id>', methods=['DELETE'])
def delete_job(job_id):
        # Check if the user is logged in and is a manager
    if 'loggedin' in session and session['loggedin'] and 'role' in session and session['role'] == 'manager':
        
        print("manager delete job")
        try:
            job =Jobs.query.get(job_id)
            if job:
                # Delete the candidate from the db
                db.session.delete(job)
                db.session.commit()
                return jsonify({'message': 'Job deleted successfully'})
            else:
                return jsonify({'message': 'Job not found'})
        except Exception as e:
            db.session.rollback()
            return jsonify({'message': 'Error occurred while deleting possition.'})
    else:
        return jsonify({'message': 'You are not authorized to perform this action.'})
    
@app.route('/edit_job/<int:job_id>', methods=['POST'])
def edit_job(job_id):

    if 'loggedin' not in session or session['role'] != 'manager':
        print("not loggedin")
        return jsonify({'message': 'You are not logged in as a manager.'}), 401
    
    
    data = request.json

    try:
        # Check if the candidate with the given candidate_id exists
        job = Jobs.query.get(job_id)

        if not job:
            return jsonify({'message': 'Possition is not found.'}), 404

        # Update the candidate's information with the new data
        job.job_title = data.get('job_title', job.job_title)
        job.job_description = data.get('job_description', job.job_description)
        job.qualifications = data.get('qualifications', job.qualifications)
        
        db.session.commit()

        return jsonify({'message': 'Possition updated successfully.'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'Error occurred during possition update.'}), 500

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
def apply(job_id):
    if 'loggedin' not in session or session['role'] != 'candidate':
        print("not logged in")
        return jsonify({'message': 'You are not logged in as a candidate.'}), 401

    candidate_id = session.get('candidate_id')
    if not candidate_id:
        return jsonify({'message': 'Candidate ID not found in the session.'}), 401

    try:
        # Check if the job_id exists in the Jobs table
        job = Jobs.query.get(job_id)
        if not job:
            return jsonify({'message': 'Job not found in the database.'}), 404

        # Check if the candidate already applied for the job
        existing_application = Application.query.filter_by(job_id=job_id, candidate_id=candidate_id).first()

        cv_entry = CV.query.filter_by(candidate_id=candidate_id).first()
        if not cv_entry:
            return jsonify({'message': 'CV not found for the candidate.'}), 404

        cv_id = cv_entry.cv_id

        if existing_application:
            # If the candidate already applied, update the application
            existing_application.cv_id = cv_id
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
    

@app.route('/view_applyed/<int:candidate_id>', methods=['GET'])
def view_applyed(candidate_id):
    print("View applied positions")
    
    try:
        # Check if the candidate_id is found in the session
        if 'loggedin' not in session or session['role'] != 'candidate':
            print("Not logged in as a candidate")
            return jsonify({'message': 'You are not logged in as a candidate.'}), 401

        # Check if the candidate_id exists in the database
        candidate = Candidate.query.filter_by(candidate_id=candidate_id).first()
        if not candidate:
            print("Candidate not found")
            return jsonify({'message': 'Candidate not found.'}), 404
        
        candidate_applications = Application.query.filter_by(candidate_id=candidate_id).all()
        application_list = []

        # Loop application 
        for application in candidate_applications:
            application_details = {
                'job_id': application.job_id,
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

@app.route('/view_all_applications', methods=['GET'])
def view_all_applications():
    try:
        # Check if the user is logged in as a manager
        if 'loggedin' not in session or session['role'] != 'manager':
            print("Not logged in as a manager")
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
        return jsonify({'message': 'Error occurred while fetching applications.'})



if __name__ == '__main__':
    app.run(debug=True)