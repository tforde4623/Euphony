from app.models import db, User

DEFAULT_USERS = [
    User(username='Demo', email='demo@aa.io', password='password', icon_url="https://source.unsplash.com/P2aOvMMUJnY"),
    User(username='Marnie', email='marnie@aa.io', password='password',icon_url="https://source.unsplash.com/iVDS4sIQs_Y"),
    User(username='Bobbie', email='bobbie@aa.io', password='password', icon_url="https://source.unsplash.com/Ul3nBBvxzWA"),
    User(username='Will', email='will@aa.io', password='password', icon_url="https://source.unsplash.com/paCAdEhnglY"),
    User(username='Santi', email='santi@aa.io', password='password', icon_url="https://source.unsplash.com/g5kW-Nb46b8"),
    User(username='Ian', email='ian@aa.io', password='password', icon_url="https://source.unsplash.com/ycMO4eKm1dU"),
    User(username='Jeremy', email='jeremy@aa.io', password='password', icon_url="https://source.unsplash.com/zA66MV4EyXc"),
    User(username='Angela', email='angela@aa.io', password='password', icon_url="https://source.unsplash.com/TyZhkVuK658"),
    User(username='Gloria', email='gloria@aa.io', password='password', icon_url="https://source.unsplash.com/Fw2Uhx5EdmI"),
    User(username='Cece', email='cece@aa.io', password='password', icon_url="https://source.unsplash.com/0dMWddrISEs"),
    User(username='Nari', email='nari@aa.io', password='password', icon_url="https://source.unsplash.com/yBsw6m04LnQ"),
    User(username='Lily', email='lily@aa.io', password='password', icon_url="https://source.unsplash.com/UAHmBhrAWeM"),
    User(username='Michael', email='michael@aa.io', password='password', icon_url="https://source.unsplash.com/4hSQFsN-qmc"),
    User(username='Andrew', email='andrew@aa.io', password='password', icon_url="https://source.unsplash.com/XQr4e5O3Q_E"),
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
