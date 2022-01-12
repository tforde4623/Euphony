from flask import Blueprint, json, request, jsonify
from sqlalchemy.orm import joinedload
from app.models import db, Message, User

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
@messages.route('/<msg_id>/edit', methods=['PUT'])
def edit_message(msg_id):
    msg = Message.query.filter_by(id=msg_id).one()
    msg_data = request.json

    msg.content = msg_data['content']
    db.session.commit()

    # we need to include the user when we return the edited msg
    msg = Message.query \
        .filter_by(id=msg_id) \
        .join(User) \
        .options(joinedload(Message.user))

    # allowing alchemies format to be in a jsonable format
    user = msg[0].user.to_dict()
    msg_dict = msg[0].to_dict()
    msg_dict['user'] = user

    return jsonify(msg_dict)

#~~~~~~~~~~~~ DELETE ~~~~~~~~~~~~~~
@messages.route('/<msg_id>/delete', methods=['DELETE'])
def delete_message(msg_id):
    msg = Message.query.filter_by(id=msg_id).one()
    db.session.delete(msg)
    db.session.commit()

    return msg_id