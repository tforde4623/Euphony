from app.models import db, User

DEFAULT_USERS = [
    User(username='Demo', email='demo@aa.io', password='password'),
    User(username='Marnie', email='marnie@aa.io', password='password'),
    User(username='Bobbie', email='bobbie@aa.io', password='password'),
    User(username='Will', email='will@aa.io', password='password'),
    User(username='Santi', email='santi@aa.io', password='password'),
    User(username='Ian', email='ian@aa.io', password='password'),
    User(username='Jeremy', email='jeremy@aa.io', password='password'),
    User(username='Angela', email='angela@aa.io', password='password'),
    User(username='Gloria', email='gloria@aa.io', password='password'),
    User(username='Cece', email='cece@aa.io', password='password'),
    User(username='Nari', email='nari@aa.io', password='password'),
    User(username='Lily', email='lily@aa.io', password='password'),
    User(username='Michael', email='michael@aa.io', password='password'),
    User(username='Andrew', email='andrew@aa.io', password='password'),
]


# Adds a demo user, you can add other users here if you want
def seed_users():
    db.session.add_all(DEFAULT_USERS)
    db.session.commit() 


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
