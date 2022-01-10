from app.models import db
from app.models.members import Member

def seed_members():
  member1 = Member(user_id=1, server_id=1)
  db.session.add(member1)
  db.session.commit()

def undo_members():
    db.session.execute('TRUNCATE members RESTART IDENTITY CASCADE;')
    db.session.commit()
