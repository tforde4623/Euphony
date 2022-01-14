from flask import Blueprint, jsonify, request
from sqlalchemy.orm import joinedload
from app.models import Message, Category, Channel, Member, User, db

members = Blueprint('members', __name__)



# ~~~~~~~~~~~~ CREATE ~~~~~~~~~~~~
# what to return from create
@members.route('/', methods=['POST'])
def join():
    member_data = request.json
    new_membership = Category(user_id=member_data['user_id'],
                            server_id=member_data['serverId']) 
    db.session.add(new_membership)
    db.session.commit()

    return jsonify(new_membership)


    #~~~~~~~~~~~~ DELETE ~~~~~~~~~~~~~~
    # what to put in filter_by and return 
@members.route('/delete', methods=['DELETE'])
def unjoin():
    member_data = request.json
    Member.query.filter_by(server_id=member_data["serverId"], user_id=member_data["userId"]).delete()
    db.session.commit()

    return jsonify(member_data)

    
