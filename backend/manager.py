from server import get_db_connection
import psycopg2
import psycopg2.extras
from db_connection import get_db_connection
from flask import Flask, request,jsonify


class Manager_users:
    def __init__(self):
        self.conn=get_db_connection()
        self.cursor= self.conn.cursor(cursor_factory=psycopg2.extras.DictCursor)
        print("You have connected to the database manager")

    def __del__(self):
        self.conn.close()

    def view_candidate(self):
        
        self.cursor.execute("SELECT * from candidate") 
        rows = self.cursor.fetchall()
        for row in rows:
            print (rows)
        print ("Operation done successfully -manager")
        
        return rows

    def filter_candidate(self, filters=None):
        
        if filters:
            print("if filters")
            if filters['education'] is not None:
                self.cursor.execute("SELECT * FROM candidate WHERE education = %s ORDER BY education", (filters['education'],))
            elif filters['gender'] is not None:
                print("if gender")
                self.cursor.execute("SELECT * FROM candidate WHERE gender = %s ORDER BY gender", (filters['gender'],))
            elif filters['work_experience'] is not None:
                print("if work_experience")
                self.cursor.execute("SELECT * FROM candidate WHERE work_experience = %s ORDER BY work_experience", (filters['work_experience'],))
        
        rows = self.cursor.fetchall()
        for row in rows:
            print(row)
        print("Operation done successfully -manager")

        return rows
        

    #delete candidate from db
    def delete_candidate(self,candidate_id):
        try:
            # Check if the candidate exists
            self.cursor.execute("SELECT * FROM candidate WHERE candidate_id = %s", (candidate_id,))
            candidate = self.cursor.fetchone()

            if candidate:
                # Delete the candidate from the database
                self.cursor.execute("DELETE FROM candidate WHERE candidate_id = %s", (candidate_id,))
                self.conn.commit()
                print("Candidate deleted successfully")
                return jsonify({'message': 'Candidate deleted successfully'})
            else:
                print("Candidate not found")
                return jsonify({'message': 'Candidate not found'})
        except Exception as e:
            print("An error occurred while deleting candidate:", str(e))
            return jsonify({'message': 'An error occurred while deleting candidate'})
        

    def edit_candidate(self, request):# email + ?
        print("edit candidate ",request)
        candidate_data = request.json

        email = candidate_data['email']
        update_data = {}

        if 'candidate_id' in candidate_data:
            update_data['candidate_id'] = candidate_data['candidate_id']
        if 'first_name' in candidate_data:
            update_data['first_name'] = candidate_data['first_name']
        if 'last_name' in candidate_data:
            update_data['last_name'] = candidate_data['last_name']
        if 'location' in candidate_data:
            update_data['location'] = candidate_data['location']
        if 'phone_number' in candidate_data:
            update_data['phone_number'] = candidate_data['phone_number']
        if 'gender' in candidate_data:
            update_data['gender'] = candidate_data['gender']
        if 'education' in candidate_data:
            update_data['education'] = candidate_data['education']
        if 'work_experience' in candidate_data:
            update_data['work_experience'] = candidate_data['work_experience']
        if 'skills' in candidate_data:
            update_data['skills'] = candidate_data['skills']
        if 'department' in candidate_data:
            update_data['department'] = candidate_data['department']
        if 'certifications' in candidate_data:
            update_data['certifications'] = candidate_data['certifications']

        if not update_data:
            print("No update data provided")
            return jsonify({'message': 'No update data provided'})

        # Generate the SET clause for the update query
        set_clause = ', '.join([f"{field} = %s" for field in update_data.keys()])
        values = tuple(update_data.values())

        print("Updating candidate in db")
        cursor = self.conn.cursor(cursor_factory=psycopg2.extras.DictCursor)

        cursor.execute(
            f"UPDATE candidate SET {set_clause} WHERE email = %s",
            (*values, email)
        )

        self.conn.commit()
        cursor.close()
        print("Candidate updated successfully")
        return jsonify({'message': 'Candidate updated successfully'})
