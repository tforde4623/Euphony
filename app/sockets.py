from flask_login import current_user
from flask_socketio import SocketIO, emit, join_room, ConnectionRefusedError
from .models.messages import Message
from .models import db
import os

def fix_datetime(dic):
    new_obj = dic
    new_obj['created_at'] = str(dic['created_at'])
    new_obj['updated_at'] = str(dic['updated_at'])

    return new_obj


if os.environ.get('FLASK_ENV') == 'production':
  origins = ['https://euphony-web.herokuapp.com']
else:
  origins = ['http://localhost:3000']

sock = SocketIO(cors_allowed_origins=origins)

@sock.on('connect')
def connect():
  if not current_user.is_authenticated:
    raise ConnectionRefusedError('unauthorized')


@sock.on('join')
def join(data):
  join_room(str(data['room']))


@sock.on('chat')
def chat(data):
  room = str(data['channelId'])

  # if the data isn't valid don't create/emit it...
  errors = {}
  if not data['content']:
      errors['content'] = 'required.'

  # these are less important to convey on the front end because it shouln't happen if not misused from third party source
  if not data['userId'] or not data['channelId']:
      errors['general'] = 'Required information not present.'

  if len(errors):
    emit('err', errors)

  else:
    new_msg = Message(content=data['content'],
                      channel_id=data['channelId'],
                      user_id=data['userId'])
    db.session.add(new_msg)
    db.session.commit()

    res_data = new_msg.to_dict()
    res_data['user'] = data['user']
    emit('chat', fix_datetime(res_data), broadcast=True, to=room)


@sock.on('edit_chat')
def edit_chat(data):
  room = str(data['channelId'])
  msg = Message.query.filter_by(id=data['id']).one()

  # make sure user owns the message
  if not current_user or current_user.id != msg.user_id:
    emit('err', 'Not authorized to do this.')

  else:
    msg.content = data['content']
    db.session.commit()
    msg_dict = msg.to_dict()
    msg_dict['user'] = data['user']
    # since content is the only thing that changes
    emit('edit_chat', fix_datetime(msg_dict), broadcast=True, to=room)


@sock.on('delete_chat')
def delete_chat(data):
  room = str(data['channel_id'])
  msg = Message.query.filter_by(id=data['id']).one()

  # make sure user owns the message
  if not current_user or current_user.id != msg.user_id:
    emit('err', 'Not authorized to do this.')

  else:
    db.session.delete(msg)
    db.session.commit()
    emit('delete_chat', data, broadcast=True, to=room)
