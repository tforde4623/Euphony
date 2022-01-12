from flask import Blueprint, jsonify, request
from sqlalchemy.orm import joinedload
from app.models import Message, Category, Channel, User, db

categories = Blueprint('categories', __name__)

@categories.route('/<server_id>')
def get_all_channels(server_id):
    categories = Category.query.filter_by(server_id= server_id).join(Channel).options(joinedload(Category.channels))
    # return jsonify([category.to_dict() for category in categories])
    dict_cats = []
    for cat in categories:
        channels = [chnl.to_dict() for chnl in cat.channels]
        cat_dict = cat.to_dict() 
        cat_dict['channelsList'] = channels
        dict_cats.append(cat_dict)
    
    return jsonify(dict_cats)