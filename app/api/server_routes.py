from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Server, Channel, Member
from app.forms import CreateServerForm, make_val_msgs

servers = Blueprint('servers', __name__)

@servers.route('/')
def view_servers():
    servers = Server.query.all()
    return jsonify([svr.to_dict() for svr in servers])


# ~~~~~~~~~~~~ CREATE ~~~~~~~~~~~~
@servers.route('/', methods=['POST'])
@login_required
def create_server():
	form = CreateServerForm()
	form['csrf_token'].data = request.cookies['csrf_token']
	svr_data = request.json

	if form.validate_on_submit() and svr_data['owner_id']:
		# Create a new server
		new_svr = Server(name=svr_data['name'],
						owner_id=svr_data['owner_id'],
						icon_url=svr_data['iconURL'])

		db.session.add(new_svr)
		db.session.commit()
		db.session.flush()

		# Create a default channel for the server with the new_svr.id
		new_default_channel = Channel(name="General", server_id=new_svr.id)
		db.session.add(new_default_channel)
		db.session.commit()
		db.session.flush()

		# Set the default channel on the server instance to the newly created channel
		new_svr.default_channel = new_default_channel.id
		db.session.add(new_svr)
		db.session.commit()

		# Add the current user to the server's membership automatically
		new_membership = Member(user_id=svr_data['owner_id'],
								server_id=new_svr.id)
		db.session.add(new_membership)
		db.session.commit()

		return jsonify(new_svr.to_dict())

	err_msgs = make_val_msgs(form.errors)

	if not svr_data['owner_id']:
		err_msgs['general'] = 'cannot authenticate'

	return jsonify({ 'errors': err_msgs })

# ~~~~~~~~~~~~ READ ~~~~~~~~~~~~
@servers.route('/<id>', methods=['GET'])
def view_server(server_id):
    server = Server.query.filter_by(id=server_id).one()
    return jsonify(server)


@servers.route('/<id>/members')
def get_server_members(id):
    server = db.session.query(Server) \
        .filter_by(id=id) \
        .one()

    return jsonify([user.to_dict() for user in server.users])

# ~~~~~~~~~~~~ UPDATE ~~~~~~~~~~~~
@servers.route('/<server_id>', methods=['PUT'])
@login_required
def edit_server(server_id):
	form = CreateServerForm()
	form['csrf_token'].data = request.cookies['csrf_token']
	server = Server.query.filter_by(id=server_id).one()
	owned = server.owner_id == current_user.id

	if form.validate_on_submit() and owned:
		svr_data = request.json

		server.name = svr_data['name']
		server.icon_url = svr_data['iconURL']
		db.session.commit()

		return jsonify(server.to_dict())

	err_msgs = make_val_msgs(form.errors)

	if not owned:
		err_msgs['general'] = 'unauthorized request'

	return jsonify({'errors': err_msgs})


# ~~~~~~~~~~~~ DELETE ~~~~~~~~~~~~
@servers.route('/<server_id>', methods=['DELETE'])
@login_required
def delete_server(server_id):
	server = Server.query.filter_by(id=server_id).one()

	if current_user.id == server.owner_id:
		server.default_channel = None
		db.session.add(server)
		db.session.commit()
		db.session.flush()

		db.session.delete(server)
		db.session.commit()

		return server_id

	# server does not belong to user making request
	return jsonify({'err': 'unauthorized'}), 401
