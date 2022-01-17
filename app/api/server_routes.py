from flask import Blueprint, request, jsonify
from app.models import db, Server, Channel

servers = Blueprint('servers', __name__)

@servers.route('/')
def view_servers():
    servers = Server.query.all()
    return jsonify([svr.to_dict() for svr in servers])


# ~~~~~~~~~~~~ CREATE ~~~~~~~~~~~~
@servers.route('/new', methods=['POST'])
def create_server():
    svr_data = request.json
    new_svr = Server(name=svr_data['name'],
                     owner_id=svr_data['userId'],
                     icon_url=svr_data['icon_url'])

    db.session.add(new_svr)
    db.session.commit()
    db.session.flush()

    print(new_svr.id, 'KITTEN')

    #  PROBLEM: Doesn't work if server names aren't unique

    # server_id = Server.query.filter_by(name=svr_data['name']).one()['id']
    

    # new_default_channel = Channel(name="General", category_id="Null", server_id=server_id)

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
@servers.route('/<id>/edit', methods=['PUT'])
def edit_server(server_id):
    server = Server.query.filter_by(id=server_id).one()
    svr_data = request.json

    server.name = svr_data['name']
    db.session.commit()

    return jsonify(server.to_dict())

# ~~~~~~~~~~~~ DELETE ~~~~~~~~~~~~
@servers.route('/<id>/delete', methods=['DELETE'])
def delete_server(server_id):
    server = Server.query.filter_by(id=server_id).one()
    db.session.delete(server)
    db.session.commit()

    return server_id
