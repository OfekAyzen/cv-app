from server import get_db_connection
import psycopg2
import psycopg2.extras
from db_connection import get_db_connection
from flask import Flask, request,jsonify


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

        candidate_data = {
            'candidate_id': candidate_id,
            'first_name': first_name,
            'last_name': last_name,
            'location': location,
            'email': email,
            'phone_number': phone_number,
            'gender': gender,
            'education': education,
            'work_experience': work_experience,
            'skills': skills,
            'department': department,
            'certifications': certifications
        }


        print("insert candidate to database")
        cursor = self.conn.cursor(cursor_factory=psycopg2.extras.DictCursor)
            
        cursor.execute("INSERT INTO candidate (candidate_id, first_name, last_name, location, email, phone_number, gender,  education, work_experience ,skills,department,certifications,username,password,role) VALUES (%s, %s,%s, %s, %s, %s, %s, %s, %s, %s, %s,%s,%s,%s,%s)",(
             candidate_id, first_name, last_name,  location,  email,phone_number, gender,education,work_experience,skills,department,certifications,username,password,role) )
      
        self.conn.commit()
        self.cursor.close()
        self.conn.close()
        return candidate_data
        
      
    

      