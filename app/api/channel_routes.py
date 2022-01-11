from flask import Blueprint, jsonify, request
from app.models import Message, Channel, db

channels = Blueprint('channels', __name__)

# GET all messages by channel_id
@channels.route('/<channel_id>/messages')
def get_channel_msgs(channel_id):
    msgs = Message.query.filter_by(channel_id= channel_id).all()
    return jsonify([msg.to_dict() for msg in msgs])

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