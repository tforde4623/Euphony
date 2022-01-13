from flask import jsonify
from flask_socketio import SocketIO, emit, join_room
from .models.messages import Message
from .models import db
import os

# setup socket origins for prod and dev
if os.environ.get('FLASK_ENV') == 'production':
  origins = ['https://euphony-project.herokuapp.com']
else:
  origins = ['http://localhost:3000']

sock = SocketIO(cors_allowed_origins=origins)


@sock.on('join')
def join(data):
  join_room(str(data['room']))


@sock.on('chat')
def chat(data):
  room = str(data['channelId'])
  new_msg = Message(content=data['content'],
                    channel_id=data['channelId'],
                    user_id=data['userId'])
  db.session.add(new_msg)
  db.session.commit()

  res_data = new_msg.to_dict()
  res_data['user'] = data['user']
  emit('chat', res_data, broadcast=True, to=room)


@sock.on('edit_chat')
def edit_chat(data):
  room = str(data['channelId'])
  msg = Message.query.filter_by(id=data['id']).one()
  msg.content = data['content']
  db.session.commit()
  msg_dict = msg.to_dict()
  msg_dict['user'] = data['user'] 
  # since content is the only thing that changes
  emit('edit_chat', msg_dict, broadcast=True, to=room)