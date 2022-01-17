from app.models import db
from app.models.channels import Channel

DEFAULT_CHANNELS = [
  Channel(name='General', server_id=1),
  Channel(name='General', server_id=2),
  Channel(name='General', server_id=3),
  Channel(name='General', server_id=4),
  Channel(name='General', server_id=5),
  Channel(name='General', server_id=6),
  Channel(name='General', server_id=7),
  Channel(name='General', server_id=8),
  Channel(name='General', server_id=9),
  Channel(name='General', server_id=10),
  Channel(name='General', server_id=11),
  Channel(name='General', server_id=12),
  Channel(name='Dog Photos', server_id=1, category_id=1),
  Channel(name='Tiktok Links', server_id=1, category_id=1),
  Channel(name='THE CAT KINGDOM', server_id=2, category_id=2),
  Channel(name='Valorant', server_id=3, category_id=3),
  Channel(name='Rainbow Six Siege', server_id=3, category_id=3),
  Channel(name='Minecraft', server_id=3, category_id=4),
  Channel(name='Slime Rancher', server_id=3, category_id=4),
  Channel(name='Breakfast', server_id=4, category_id=5),
  Channel(name='Dessert', server_id=4, category_id=5),
  Channel(name='Childhood Photos', server_id=4, category_id=6),
  Channel(name='Tool Setup', server_id=4, category_id=7),
  Channel(name='Vi x Caitlyn', server_id=9, category_id=11)
]

def seed_channels():
  db.session.add_all(DEFAULT_CHANNELS)
  db.session.commit()

def undo_channels():
    db.session.execute('TRUNCATE channels RESTART IDENTITY CASCADE;')
    db.session.commit()
