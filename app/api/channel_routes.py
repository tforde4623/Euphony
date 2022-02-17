from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from sqlalchemy.orm import joinedload
from app.models import Message, Server, Channel, User, db
from app.forms import ChannelForm, make_val_msgs

channels = Blueprint('channels', __name__)

# GET all messages by channel_id


@channels.route('/<channel_id>/messages')
@login_required
def get_channel_msgs(channel_id):
    msgs = Message.query \
        .filter_by(channel_id=channel_id) \
        .join(User) \
        .options(joinedload(Message.user))

    # allowing alchemies format to be in a jsonable format
    dict_msgs = []
    for msg in msgs:
        user = msg.user.to_dict()
        msg_dict = msg.to_dict()
        msg_dict['user'] = user
        msg_dict['created_at'] = str(msg_dict['created_at'])
        msg_dict['updated_at'] = str(msg_dict['updated_at'])
        dict_msgs.append(msg_dict)

    return jsonify(dict_msgs)


@channels.route('/')
@login_required
def get_all_channels():
    channels = Channel.query.all()
    return jsonify([channel.to_dict() for channel in channels])


@channels.route('/', methods=['POST'])
@login_required
def create_channel():
    form = ChannelForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    # we need to get server to make sure the user that made the request is the
    # server owner
    channel_payload = request.json
    server = Server.query.filter_by(id=channel_payload['serverId']).one()

    if form.validate_on_submit() and server.owner_id == current_user.id:
        new_channel = Channel(name=channel_payload['name'],
                              server_id=channel_payload['serverId'],
                              category_id=channel_payload['categoryId'])

        db.session.add(new_channel)
        db.session.commit()

        return jsonify(new_channel.to_dict())

    err_msgs = make_val_msgs(form.errors)

    if server.owner_id != current_user.id:
        err_msgs['auth'] = ['Unauthorized']

    return jsonify({'errors': err_msgs})


@channels.route('/<id>', methods=['PUT'])
@login_required
def edit_channel(id):
    form = ChannelForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    channel = Channel.query.filter_by(id=id).one()

    channel_data = request.json
    server = Server.query.filter_by(id=channel_data['serverId']).one()

    if form.validate_on_submit() and current_user.id == server.owner_id:
        channel.name = channel_data['name']
        if 'categoryId' in channel_data:
            channel.category_id = channel_data['categoryId']

        db.session.commit()

        return jsonify(channel.to_dict())

    err_msgs = make_val_msgs(form.errors)

    if current_user.id != server.owner_id:
        err_msgs['user'] = 'not authorized'

    return jsonify({'errors': err_msgs})


@channels.route('/<id>', methods=['DELETE'])
@login_required
def delete_channel(id):
    server = Server.query.filter_by(id=id).one()

    if server.owner_id == current_user.id:
        channel = Channel.query.filter_by(id=id).one()
        db.session.delete(channel)
        db.session.commit()

        return id

    # user not authorized to do this
    return jsonify({'errors': 'not authorized to do this'})
