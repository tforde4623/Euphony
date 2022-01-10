from app.models import db
from app.models.categories import Category

def seed_categories():
  photos = Category(name="Photos", server_id=1)
  db.session.add(photos)
  db.session.commit()

def undo_categories():
    db.session.execute('TRUNCATE categories RESTART IDENTITY CASCADE;')
    db.session.commit()
