from app.models import db
from app.models.messages import Message

def seed_messages():
  message1 = Message(content="What an adorable dog.", user_id=1, channel_id=1)
  db.session.add(message1)
  db.session.commit()

def undo_messages():
    db.session.execute('TRUNCATE messages RESTART IDENTITY CASCADE;')
    db.session.commit()
