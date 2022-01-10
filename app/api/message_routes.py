from flask import Blueprint, session, request
from app.models import Message

messages = Blueprint('messages', __name__)

# ~~~~~~~~~~~~ CREATE ~~~~~~~~~~~~
@messages.route('/', methods=['POST'])
def create_message():
    ''' 
    creating a message (sending) and add to db 
    we need content/channel_id in json from fe
    well take user from session
    '''
    curr_user = session.get('user').id 
    msg_data = request.get_json()

    new_msg = Message(content=msg_data['content'], 
                      user_id=curr_user_id, 
                      channel_id=msg_data['channel_id'])

# ~~~~~~~~~~~~ READ ~~~~~~~~~~~~~~
'''getting all msgs will be by channel, in the channel routes'''
