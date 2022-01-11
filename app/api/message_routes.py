from flask import Blueprint, json, request, jsonify
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

#~~~~~~~~~~~~ UPDATE ~~~~~~~~~~~~~~
@messages.route('/<id>/edit', methods=['PUT'])
def edit_message(msg_id):
    msg = Message.query.filter_by(id=msg_id).one()
    msg_data = request.json

    msg.content = msg_data['content']
    db.session.commit()

    return jsonify(msg.to_dict())

#~~~~~~~~~~~~ DELETE ~~~~~~~~~~~~~~
@messages.route('/<id>/delete', methods=['DELETE'])
def delete_message(msg_id):
    msg = Message.query.filter_by(id=msg_id).one()
    db.session.delete(msg)
    db.session.commit()

    return msg_id