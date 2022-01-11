from flask import Blueprint, jsonify
from app.models import Message 

channels = Blueprint('channels', __name__)

# GET all messages by channel_id
@channels.route('/<channel_id:int>/messages')
def get_channel_msgs(channel_id):
    msgs = Message.query.all(Message.channel_id == channel_id)
    return jsonify(msgs.to_dict())
