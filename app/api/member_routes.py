from flask import Blueprint, jsonify, request
from sqlalchemy.orm import joinedload
from app.models import Message, Category, Channel, Member, User, db

members = Blueprint('members', __name__)

# ========read=========
# read all servers for a given user
@members.route('/memberships/<user_id>')
def check_memberships(user_id):
    memberships = Member.query.filter_by(user_id=user_id).all()

    return jsonify([mmship.to_dict() for mmship in memberships])


# ~~~~~~~~~~~~ CREATE ~~~~~~~~~~~~
# what to return from create
@members.route('/new', methods=['POST'])
def join():
    member_data = request.json
    new_membership = Member(user_id=member_data['userId'],
                            server_id=member_data['serverId']) 
    db.session.add(new_membership)
    db.session.commit()

    memberships = Member.query.filter_by(user_id=member_data["userId"]).all()

    return jsonify([mmship.to_dict() for mmship in memberships])


#~~~~~~~~~~~~ DELETE ~~~~~~~~~~~~~~
# what to put in filter_by and return 

@members.route('/delete', methods=['DELETE'])
def unjoin():
    member_data = request.json
    Member.query.filter_by(server_id=member_data["serverId"], user_id=member_data["userId"]).delete()
    db.session.commit()

    memberships = Member.query.filter_by(user_id=member_data["userId"]).all()

    return jsonify([mmship.to_dict() for mmship in memberships])

    
