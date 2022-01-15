from app.models import db, Member

DEFAULT_MEMBERSHIP = [
  Member(user_id=1, server_id=1), 
  Member(user_id=1, server_id=2),
  Member(user_id=4, server_id=3),
  Member(user_id=1, server_id=4),
  Member(user_id=2, server_id=5),
  Member(user_id=12, server_id=6),
  Member(user_id=13, server_id=7),
  Member(user_id=7, server_id=8),
  Member(user_id=4, server_id=9),
  Member(user_id=8, server_id=10),
  Member(user_id=5, server_id=11),
  Member(user_id=6, server_id=12),
  Member(user_id=8, server_id=13),
  Member(user_id=1, server_id=7),
  Member(user_id=1, server_id=11),
  Member(user_id=4, server_id=4),
  Member(user_id=6, server_id=12),
  Member(user_id=6, server_id=3),
  Member(user_id=2, server_id=1),
  Member(user_id=3, server_id=1),
  Member(user_id=10, server_id=6),
]

def seed_members():
  db.session.add_all(DEFAULT_MEMBERSHIP)
  db.session.commit()

def undo_members():
    db.session.execute('TRUNCATE members RESTART IDENTITY CASCADE;')
    db.session.commit()
