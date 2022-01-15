from app.models import db
from app.models.categories import Category

DEFALT_CATEGORIES = [
  Category(name="SO CUUUUUUTE!", server_id=1),
  Category(name="PRAISE THEM", server_id=2),
  Category(name="FPS", server_id=3),
  Category(name="Casual & Comfy", server_id=3),
  Category(name="Kitchen", server_id=4),
  Category(name="Attic", server_id=4),
  Category(name="Garage", server_id=4),
  Category(name="Earl Grey", server_id=6),
  Category(name="Matcha", server_id=6),
  Category(name="Vex BiS", server_id=9),
  Category(name="Arcane Spoilers!!!", server_id=9),
  Category(name="Team Billy", server_id=11),
  Category(name="Team Mandy", server_id=11)
]

def seed_categories():
  db.session.add_all(DEFALT_CATEGORIES)
  db.session.commit()

def undo_categories():
    db.session.execute('TRUNCATE categories RESTART IDENTITY CASCADE;')
    db.session.commit()
