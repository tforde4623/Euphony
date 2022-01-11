from flask import Blueprint, jsonify, request
from sqlalchemy.orm import joinedload
from app.models import Message, Channel, User, db

channels = Blueprint('channels', __name__)

# GET all messages by channel_id
@channels.route('/<channel_id>/messages')
def get_channel_msgs(channel_id):
    msgs = Message.query \
        .filter_by(channel_id= channel_id) \
        .join(User) \
        .options(joinedload(Message.user))

    # allowing alchemies format to be in a jsonable format
    dict_msgs = []
    for msg in msgs:
        user = msg.user.to_dict()
        msg_dict = msg.to_dict() 
        msg_dict['user'] = user
        dict_msgs.append(msg_dict)
    
    return jsonify(dict_msgs)

@channels.route('/')
def get_all_channels():
    channels = Channel.query.all()
    return jsonify([channel.to_dict() for channel in channels])

@channels.route('/', methods=['POST'])
def create_channel():
    channel_payload = request.json

    new_channel = Channel(name=channel_payload['name'],
                      server_id=channel_payload['serverId'],
                      channel_id=channel_payload['channelId'])

    db.session.add(new_channel)
    db.session.commit()

    return jsonify(new_channel.to_dict())