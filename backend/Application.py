from datetime import datetime
from database import db

class Application(db.Model):
    __tablename__ = 'applications'

    application_id = db.Column(db.Integer, primary_key=True)
    job_id = db.Column(db.Integer, db.ForeignKey('jobs.job_id'), nullable=False)
    candidate_id = db.Column(db.Integer, db.ForeignKey('candidate.candidate_id'), nullable=False)
    cv_id = db.Column(db.Integer, db.ForeignKey('cv.cv_id'), nullable=False)
    application_date =db.Column(db.DateTime, default=datetime.utcnow)
    status = db.Column(db.String(20), default='Pending')
    

    def __init__(self,application_id, job_id, candidate_id, cv_id,application_date, status='Pending'):
       
        self.application_id=application_id
        self.job_id = job_id
        self.candidate_id = candidate_id
        self.cv_id = cv_id
        self.application_date=application_date
        self.status = status
        