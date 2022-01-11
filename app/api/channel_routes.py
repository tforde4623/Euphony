from flask import Blueprint, jsonify
from app.models import Message 

channels = Blueprint('channels', __name__)

# GET all messages by channel_id
@channels.route('/<channel_id>/messages')
def get_channel_msgs(channel_id):
    msgs = Message.query.filter_by(channel_id= channel_id).all()
    return jsonify([msg.to_dict() for msg in msgs])
