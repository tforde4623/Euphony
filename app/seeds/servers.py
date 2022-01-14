from app.models import db, Server

DEFAULT_SERVERS = [
  Server(name="Dog Appreciation", owner_id=1, icon_url="https://source.unsplash.com/Sg3XwuEpybU"),
  Server(name="Cool Cat Club", owner_id=1),
  Server(name="Gamers United", owner_id=4),
  Server(name="The Room", owner_id=1),
  Server(name='Cool Zone', owner_id=2),
  Server(name='Communitea', owner_id=12),
  Server(name='Ice agers', owner_id=13),
  Server(name='CStrikers', owner_id=7),
  Server(name='Pro League Champs', owner_id=4),
  Server(name='Minecraft Legends', owner_id=8),
  Server(name='Grim Reaper Tribe', owner_id=5),
  Server(name='Game Changers', owner_id=6),
  Server(name='FortThisNite', owner_id=8)
]

def seed_servers():
  db.session.add_all(DEFAULT_SERVERS)
  db.session.commit()

def undo_servers():
    db.session.execute('TRUNCATE servers RESTART IDENTITY CASCADE;')
    db.session.commit()
