from flask import Blueprint, json, request, jsonify
from app.models import db, Server

servers = Blueprint('servers', __name__)

# ~~~~~~~~~~~~ CREATE ~~~~~~~~~~~~
@servers.route('/new', methods=['POST'])
def create_server():
    svr_data = request.json
    new_svr = Server(name=svr_data['name'],
                     owner_id=svr_data['userId'],
                     icon_url=svr_data['icon_url'])
    
    db.session.add(new_svr)
    db.session.commit()

    return jsonify(new_svr.to_dict())

# ~~~~~~~~~~~~ READ ~~~~~~~~~~~~
@servers.route('/<id>', methods=['GET'])
def view_server(server_id):
    server = Server.query.filter_by(id=server_id).one()
    return jsonify(server)

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