from flask import Blueprint, request, jsonify
from app.models import db, Server, Channel

servers = Blueprint('servers', __name__)

@servers.route('/')
def view_servers():
    servers = Server.query.all()
    return jsonify([svr.to_dict() for svr in servers])


# ~~~~~~~~~~~~ CREATE ~~~~~~~~~~~~
@servers.route('/', methods=['POST'])
def create_server():

    # Create a new server
    svr_data = request.json
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
    print(new_default_channel.id, "CATTT")
    
    # Set the default channel on the server instance to the newly created channel
    new_svr.default_channel = new_default_channel.id
    db.session.add(new_svr)
    db.session.commit()

    return jsonify(new_svr.to_dict())

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
def edit_server(server_id):
    server = Server.query.filter_by(id=server_id).one()
    svr_data = request.json

    server.name = svr_data['name']
    server.icon_url = svr_data['iconURL']
    db.session.commit()

    return jsonify(server.to_dict())

# ~~~~~~~~~~~~ DELETE ~~~~~~~~~~~~
@servers.route('/<server_id>', methods=['DELETE'])
def delete_server(server_id):
    server = Server.query.filter_by(id=server_id).one()
    db.session.delete(server)
    db.session.commit()

    return server_id
