from app.models import db
from app.models.channels import Channel

def seed_channels():
  dogPhotos = Channel(name="Dog Photos", server_id=1, category_id=1)
  default = Channel(name="General", server_id=1, category_id=1)
  db.session.add(default)
  db.session.add(dogPhotos)
  db.session.commit()

def undo_channels():
    db.session.execute('TRUNCATE channels RESTART IDENTITY CASCADE;')
    db.session.commit()
