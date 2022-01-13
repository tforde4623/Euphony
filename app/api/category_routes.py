from flask import Blueprint, jsonify, request
from sqlalchemy.orm import joinedload
from app.models import Message, Category, Channel, User, db

categories = Blueprint('categories', __name__)

#~~~~~~~~~~~~ HELPER METHOD ~~~~~~~~~~~~~~
def nested_to_dict(categories):
        dict_cats = []
        for cat in categories:
            channels = [chnl.to_dict() for chnl in cat.channels]
            cat_dict = cat.to_dict() 
            cat_dict['channelsList'] = channels
            dict_cats.append(cat_dict)
        return dict_cats


#~~~~~~~~~~~~ GET ~~~~~~~~~~~~~~
@categories.route('/<server_id>')
def get_all_categories(server_id):
    categories = Category.query.filter_by(server_id= server_id).join(Channel).options(joinedload(Category.channels))
    return jsonify(nested_to_dict(categories))


# ~~~~~~~~~~~~ CREATE ~~~~~~~~~~~~
@categories.route('/', methods=['POST'])
def create_category():
    category_data = request.json
    new_category = Category(name=category_data['name'],
                            server_id=category_data['serverId']) 
    db.session.add(new_category)
    db.session.commit()

    categories = Category.query.filter_by(server_id= server_id).join(Channel).options(joinedload(Category.channels))
    return jsonify(nested_to_dict(categories))
    

#~~~~~~~~~~~~ UPDATE ~~~~~~~~~~~~~~
@categories.route('/<category_id>', methods=['PUT'])
def update_category(category_id):
    category = Category.query.filter_by(id=category_id).one()
    category_data = request.json

    category.name = category_data['name']
    db.session.commit()

    categories = Category.query.filter_by(server_id= server_id).join(Channel).options(joinedload(Category.channels))
    return jsonify(nested_to_dict(categories))

#~~~~~~~~~~~~ DELETE ~~~~~~~~~~~~~~
@categories.route('/<category_id>', methods=['DELETE'])
def delete_category(category_id):
    category = Category.query.filter_by(id=category_id).one()
    db.session.delete(msg)
    db.session.commit()

    categories = Category.query.filter_by(server_id= server_id).join(Channel).options(joinedload(Category.channels))
    return jsonify(nested_to_dict(categories))
