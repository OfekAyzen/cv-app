from server import get_db_connection
import psycopg2
import psycopg2.extras
from db_connection import get_db_connection
from flask import Flask, request,jsonify, flash
from werkzeug.security import generate_password_hash, check_password_hash
import re 
class Candidate_users:
    def __init__(self):
        self.conn=get_db_connection()
        self.cursor= self.conn.cursor(cursor_factory=psycopg2.extras.DictCursor)
        print("You have connected to the database candidate")
        

    def __del__(self):
        self.conn.close()

    #def view_candidate(self):
    #    self.cursor.execute("SELECT * from candidate") 
    #    rows = self.cursor.fetchall()
    #    for row in rows:
    #        print (rows)
    #    print ("Operation done successfully")
    #    
    #    return rows
    
    def add_candidate(self,request):
        print("add candidate" )
        _json = request.json
        
        candidate_id=_json['candidate_id']
        first_name=_json['first_name']
        last_name=_json['last_name']
        location=_json['location']
        email=_json['email']
        phone_number=_json['phone_number']
        gender=_json['gender']
        education=_json['education']
        work_experience=_json['work_experience'] 
        skills=_json['skills'] 
        department=_json['department'] 
        certifications=_json['certifications'] 
        username=_json['username']
        password=_json['password']
        role='candidate'
        print("id :",candidate_id, " role : ",role , " username ",username, "password ",password)
        
    

        print("insert JOB APPLICATION to database")

        cursor = self.conn.cursor(cursor_factory=psycopg2.extras.DictCursor)
        
        # Check if the candidate_id already exists in the table
        cursor.execute("SELECT candidate_id FROM candidate WHERE candidate_id = %s", (candidate_id,))
        existing_candidate = cursor.fetchone()

        if existing_candidate:
            # Update the existing candidate's information
            print("update job app")
            cursor.execute(
                
                "UPDATE candidate SET first_name = %s, last_name = %s, location = %s, email = %s, phone_number = %s, gender = %s, education = %s, work_experience = %s, skills = %s, department = %s, certifications = %s WHERE candidate_id = %s",
                (first_name, last_name, location, email, phone_number, gender, education, work_experience, skills, department, certifications, candidate_id)
            )
        else:
            # Insert a new candidate with the provided candidate_id
            print("insert job app")
            cursor.execute(
                "INSERT INTO candidate (candidate_id, first_name, last_name, location, email, phone_number, gender, education, work_experience, skills, department, certifications) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)",
                (candidate_id, first_name, last_name, location, email, phone_number, gender, education, work_experience, skills, department, certifications)
            )
    
        self.conn.commit()
        cursor.close()
        self.conn.close()
        
      
    def sign_up(self,request):
        

        # Extract the JSON data from the request
        _json = request.json
        first_name = _json['first_name']
        last_name = _json['last_name']
        username = _json['username']
        password = _json['password']
        email = _json['email']
        phone_number=_json['phone_number']
        role='candidate'
        _hashed_password = generate_password_hash(password)

        # Check if account exists
        self.cursor.execute('SELECT * FROM users WHERE username = %s', (username,))
        account = self.cursor.fetchone()

        # If account exists, show error and validation checks
        if account:
            flash('Account already exists!')
        elif not re.match(r'[^@]+@[^@]+\.[^@]+', email):
            flash('Invalid email address!')
        elif not re.match(r'[A-Za-z0-9]+', username):
            flash('Username must contain only characters and numbers!')
        elif not username or not password or not email:
            flash('Please fill out the form!')
        else:
            # Generate a candidate ID
            self.cursor.execute('SELECT MAX(candidate_id) FROM candidate')
            max_candidate_id = self.cursor.fetchone()[0]
            candidate_id = max_candidate_id + 1 if max_candidate_id else 1

            # Insert new account into candidates table
            self.cursor.execute(
                "INSERT INTO candidate (candidate_id, first_name, last_name, username, password, email,phone_number,role) VALUES (%s,%s, %s, %s, %s, %s, %s,%s)",
                (candidate_id, first_name, last_name, username, _hashed_password, email,phone_number,role))
            self.conn.commit()
            flash('You have successfully registered!')


    def get_candidate_id(self, username, password):
           
        try:
            cursor = self.conn.cursor()

            # Retrieve the candidate from the database based on the provided username
            cursor.execute("SELECT * FROM candidate WHERE username = %s", (username,))
            candidate = cursor.fetchone()

            if candidate:
                if check_password_hash(candidate[13], password):
                    print("candidate id extract:", candidate[0])
                    return candidate[0]
                else:
                    return None
            else:
                return None
        except Exception as e:
            print('Error:', str(e))
            return None

 