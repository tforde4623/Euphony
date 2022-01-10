from app.models import db
from app.models.servers import Server

def seed_servers():
  server1 = Server(name="Dog Appreciation", owner_id=1, icon_url="https://source.unsplash.com/Sg3XwuEpybU")
  db.session.add(server1)
  db.session.commit()

def undo_servers():
    db.session.execute('TRUNCATE servers RESTART IDENTITY CASCADE;')
    db.session.commit()
