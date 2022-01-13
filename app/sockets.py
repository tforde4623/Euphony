from flask_socketio import SocketIO, emit, join_room
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
  emit('chat', data, broadcast=True, to=room)