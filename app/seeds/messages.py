from app.models import db
from app.models.messages import Message

DEFAULT_MESSAGES = [
  # Dog Appreciation: 1
  # Channels: General (1), Dog Pphotos (13), TiktokLinks (14)
  # Members: 1, 2, 3

  # Dog appreciation: general

  Message(content='One of my favorite shows to watch on Super Bowl Sunday is Puppy Bowl. If you haven’t seen it, watch it. They take some rescue dogs and they have a cute little football competition. They also tell the stories of the backgrounds of the dogs. It is amazing.', user_id=1, channel_id=1),
  Message(content='I care zero about football. I legitimately only care about the puppy bowl.', user_id=2, channel_id=1),
  Message(content='Don\'t forget the Kitty half time show!', user_id=3, channel_id=1),
  Message(content='I spent like an hour today asking myself while the dog park was so empty until someone mentioned that the Super Bowl was today lmao', user_id=1, channel_id=1),
  Message(content='It’s tradition at this point, my friends and I all gather at someone’s house and watch that instead of the super bowl. This year, we were cheering for Squirt since he looks a lot like my dog.', user_id=2, channel_id=1),
  Message(content='It’s the best! I love the clever commentary. So cute', user_id=3, channel_id=1),
  Message(content='I tune in every year!', user_id=1, channel_id=1),


  # Dog appreciation: dog photos: 13
  # Message(content='', user_id=, channel_id=),
  # Message(content='', user_id=, channel_id=),
  # Message(content='', user_id=, channel_id=),

  # # Dog appreciation: tiktok links
  # Message(content='', user_id=, channel_id=),
  # Message(content='', user_id=, channel_id=),
  # Message(content='', user_id=, channel_id=),
  # Message(content='', user_id=, channel_id=),
  # Message(content='', user_id=, channel_id=),
  # Message(content='', user_id=, channel_id=),



  # Message(content='', user_id=, channel_id=),
  # Message(content='', user_id=, channel_id=),
  # Message(content='', user_id=, channel_id=),
  # Message(content='', user_id=, channel_id=),
  # Message(content='', user_id=, channel_id=),
  # Message(content='', user_id=, channel_id=),
  # Message(content='', user_id=, channel_id=),
  # Message(content='', user_id=, channel_id=),
  # Message(content='', user_id=, channel_id=),
  # Message(content='', user_id=, channel_id=),
  # Message(content='', user_id=, channel_id=),
  # Message(content='', user_id=, channel_id=),
  # Message(content='', user_id=, channel_id=),
  # Message(content='', user_id=, channel_id=),
  # Message(content='', user_id=, channel_id=),
  # Message(content='', user_id=, channel_id=),
  # Message(content='', user_id=, channel_id=),
  # Message(content='', user_id=, channel_id=),
  # Message(content='', user_id=, channel_id=),
  # Message(content='', user_id=, channel_id=),
  # Message(content='', user_id=, channel_id=),
  # Message(content='', user_id=, channel_id=),
  # Message(content='', user_id=, channel_id=),
  # Message(content='', user_id=, channel_id=),
]

def seed_messages():
  db.session.add_all(DEFAULT_MESSAGES)
  db.session.commit()

def undo_messages():
    db.session.execute('TRUNCATE messages RESTART IDENTITY CASCADE;')
    db.session.commit()
