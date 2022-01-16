from app.models import db, Server

DEFAULT_SERVERS = [
  Server(name="Dog Appreciation", owner_id=1, icon_url="https://source.unsplash.com/Sg3XwuEpybU"),
  Server(name="Cool Cat Club", owner_id=1, icon_url="https://source.unsplash.com/75715CVEJhI"),
  Server(name="Gamers United", owner_id=4, icon_url="https://source.unsplash.com/4GA8bgF9f1M"),
  Server(name="The Room", owner_id=1, icon_url="https://source.unsplash.com/Uxqlfigh6oE"),
  Server(name='Cool Zone', owner_id=2, icon_url="https://source.unsplash.com/SR0_MNa77MU"),
  Server(name='Communitea', owner_id=12, icon_url="https://source.unsplash.com/wJK9eTiEZHY"),
  Server(name='Ice agers', owner_id=13, icon_url="https://source.unsplash.com/t_Rq61CvcbI"),
  Server(name='CStrikers', owner_id=7, icon_url="https://source.unsplash.com/nXYGViDhUd4"),
  Server(name='Pro League Champs', owner_id=4, icon_url="https://source.unsplash.com/OgqWLzWRSaI"),
  Server(name='Grim Reaper Tribe', owner_id=5, icon_url="https://source.unsplash.com/FK5uXiCp9-Q"),
  Server(name='Game Changers', owner_id=6, icon_url="https://source.unsplash.com/p0j-mE6mGo4"),
  Server(name='FortThisNite', owner_id=8, icon_url="https://source.unsplash.com/qgInQSplXBU")
]

def seed_servers():
  db.session.add_all(DEFAULT_SERVERS)
  db.session.commit()

def undo_servers():
    db.session.execute('TRUNCATE servers RESTART IDENTITY CASCADE;')
    db.session.commit()
