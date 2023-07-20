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
    position = db.Column(db.String(100))
    certifications = db.Column(db.String(200))
    username = db.Column(db.String(40))
    password = db.Column(db.String(40))
    role = db.Column(db.String(20))

    def __init__(self, candidate_id, first_name, last_name, location, email, phone_number, gender, education,
                 work_experience, skills, position, certifications, username, password, role='candidate'):
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
        self.position = position
        self.certifications = certifications
        self.username = username
        self.password = password
        self.role = role
