

# Define the database connection settings
DB_USERNAME = 'postgres'
DB_PASSWORD = 'Tech1919'
DB_HOST = 'localhost'
DB_NAME = 'dev'

# Construct the database URI
SQLALCHEMY_DATABASE_URI = f"postgresql://{DB_USERNAME}:{DB_PASSWORD}@{DB_HOST}/{DB_NAME}"