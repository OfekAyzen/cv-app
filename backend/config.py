

# Define the database connection settings
DB_USERNAME = 'postgres'
DB_PASSWORD = 'Tech1919!'
DB_HOST = 'dev.cstxeaoeb5yt.us-east-2.rds.amazonaws.com'
DB_NAME = 'onlinepostgres'

# Construct the database URI
SQLALCHEMY_DATABASE_URI = f"postgresql://{DB_USERNAME}:{DB_PASSWORD}@{DB_HOST}/{DB_NAME}"