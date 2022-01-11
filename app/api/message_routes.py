from flask import Blueprint, session, request, jsonify
from app.models import db, Message

messages = Blueprint('messages', __name__)

# ~~~~~~~~~~~~ CREATE ~~~~~~~~~~~~
@messages.route('/', methods=['POST'])
def create_message():
    msg_data = request.json

    new_msg = Message(content=msg_data['content'],
                      user_id=msg_data['userId'],
                      channel_id=msg_data['channelId'])

    db.session.add(new_msg)
    db.session.commit()

    return jsonify(new_msg.to_dict())

# ~~~~~~~~~~~~ READ ~~~~~~~~~~~~~~
'''getting all msgs will be by channel, in the channel routes'''
