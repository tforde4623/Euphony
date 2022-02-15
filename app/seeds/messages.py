from app.models import db
from app.models.messages import Message

DEFAULT_MESSAGES = [
  # Dog appreciation
  Message(content='One of my favorite shows to watch on Super Bowl Sunday is Puppy Bowl. If you haven’t seen it, watch it. They take some rescue dogs and they have a cute little football competition. They also tell the stories of the backgrounds of the dogs. It is amazing.', user_id=1, channel_id=1),
  Message(content='I care zero about football. I legitimately only care about the puppy bowl.', user_id=2, channel_id=1),
  Message(content='Don\'t forget the Kitty half time show!', user_id=3, channel_id=1),
  Message(content='I spent like an hour today asking myself while the dog park was so empty until someone mentioned that the Super Bowl was today lmao', user_id=1, channel_id=1),
  Message(content='It’s tradition at this point, my friends and I all gather at someone’s house and watch that instead of the super bowl. This year, we were cheering for Squirt since he looks a lot like my dog.', user_id=2, channel_id=1),
  Message(content='It’s the best! I love the clever commentary. So cute', user_id=3, channel_id=1),
  Message(content='I tune in every year!', user_id=1, channel_id=1),
  Message(content='This sweet little boy needs a name. https://www.reddit.com/r/DogPics/comments/sk2jcc/this_sweet_little_boy_needs_a_name/', user_id=2, channel_id=13),
  Message(content='Joey', user_id=3, channel_id=13),
  Message(content='How about Cloud?', user_id=1, channel_id=13),

 # Cool Cat Club
  Message(content='We just moved into our new home on Jan 31st. We have two male cats. It took both of them two days to start moving about the house freely. Hey we’re both doing great. No spraying no scratching thing they shouldn’t be. They are using their three litter boxes. We set up their houses and toys as well.', user_id=1, channel_id=2),
  Message(content='Any tips?', user_id=1, channel_id=2),

  # Gamers United
  Message(content='The title says it all. This is the place to post any general topics relating to gaming at large. Chat about your favorite games, recent purchases, etc.', user_id=4, channel_id=3),
  Message(content='Xbox Buys Activision. Sony Buys Bungie. Where is Nintendo in this buying craze?', user_id=6, channel_id=3),
  Message(content='Nintendo are the oddball, they don\'t really seem too play the same game as the other two.  That doesn\'t mean they definitely won\'t jump on the buying craze.  Microsoft and Sony are somewhat predictable but with Nintendo who knows.', user_id=4, channel_id=3),
 
 # The Room 
  Message(content='Organizing room revamps here', user_id=4, channel_id=4),

  # The Cool Zone 5
  Message(content='Organizing our study group.', user_id=2, channel_id=5),

  # Communitea 6, users: 10, 12
  Message(content='For discussion of beverages made from soaking camellia sinensis leaves (or twigs) in water, and, to a lesser extent, herbal infusions, yerba mate, and other tisanes.', user_id=10, channel_id=6),
  Message(content='Was on the bbc today talking about the gift guide and the host said a self-heating mug was "very controversial" becuase he thinks if you let your tea cool to an undrinkable temp you should have to live with it which is th emost british thing I\'ve ever heard', user_id=12, channel_id=6),
  Message(content='If tea spread to your country by sea, you call it ‘tea’. If by land, you call it chai. (*This is because the ports of Fujian and Taiwan use the coastal pronunciation ‘te’, whereas Mandarin uses chá.)', user_id=10, channel_id=6),

  # Ice Agers 7
  Message(content='Ice Age: Disney no longer owns Scrat following trademark dispute', user_id=13, channel_id=7),

  # CStrikers 8
  Message(content='This is a server about CS:GO LFG and more join on up and have fun, enjoy!', user_id=7, channel_id=8),

  # Pro League Champs 9
  Message(content='Most pros can play every champ. Maybe not at pro level but still at a high level. Good players learns champs fast while bad players need 100 game’s to understand it', user_id=4, channel_id=9),
  Message(content='Pro player pools are determined by the Meta. There are players with favorite champions, but most of time they arent playable in competitive matches.', user_id=4, channel_id=9),

  # FortThisNight 12
  Message(content='A behind-the-scenes look at how Epic Games makes emotes for Fortnite', user_id=6, channel_id=12),
]

def seed_messages():
  db.session.add_all(DEFAULT_MESSAGES)
  db.session.commit()

def undo_messages():
    db.session.execute('TRUNCATE messages RESTART IDENTITY CASCADE;')
    db.session.commit()
