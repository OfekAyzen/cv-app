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




class Jobs(db.Model):

    __tablename__ = 'jobs'
    job_id = db.Column(db.Integer, primary_key=True)
    job_description  = db.Column(db.String(2000))
    qualifications = db.Column(db.String(500))
    job_title = db.Column(db.String(100))
   
    def __init__(self,job_id, job_description , qualifications, job_title):
        self.job_id=job_id
        self.job_description = job_description
        self.qualifications = qualifications
        self.job_title = job_title
        


        