from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.forms import CategoryForm, make_val_msgs
from sqlalchemy.orm import joinedload
from app.models import Server, Category, Channel, db

categories = Blueprint('categories', __name__)

# ~~~~~~~~~~~~ HELPER METHOD ~~~~~~~~~~~~~~


def nested_to_dict(categories):
    dict_cats = []
    for cat in categories:
        channels = [chnl.to_dict() for chnl in cat.channels]
        cat_dict = cat.to_dict()
        cat_dict['channelsList'] = channels
        dict_cats.append(cat_dict)
    return dict_cats


# ~~~~~~~~~~~~ GET ~~~~~~~~~~~~~~
@categories.route('/<server_id>')
@login_required
def get_all_categories(server_id):
    cats = Server.query.filter_by(id=server_id).one()
    return jsonify([{'name': cat.name,
                     'id': cat.id,
                     'channels': [c.to_dict() for c in cat.channels]}
                    for cat in cats.categories])


# ~~~~~~~~~~~~ CREATE ~~~~~~~~~~~~
@categories.route('/', methods=['POST'])
@login_required
def create_category():
    form = CategoryForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    category_data = request.json
    server = Server.query.filter_by(id=category_data['serverId']).one()

    if form.validate_on_submit() and server.owner_id == current_user.id:
        new_category = Category(name=category_data['name'],
                                server_id=category_data['serverId'])
        db.session.add(new_category)
        db.session.commit()

        categories = Category.query.filter_by(
            server_id=category_data['serverId']).join(Channel).options(
            joinedload(
                Category.channels))

        return jsonify(nested_to_dict(categories))

    err_msgs = make_val_msgs(form.errors)

    if server.owner_id != current_user.id:
        err_msgs['auth'] = 'unauthorized'

    return jsonify(err_msgs)


# ~~~~~~~~~~~~ UPDATE ~~~~~~~~~~~~~~
@categories.route('/<category_id>', methods=['PUT'])
@login_required
def update_category(category_id):
    form = CategoryForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    category_data = request.json
    server = Server.query.filter_by(id=category_data['serverId']).one()

    if form.validate_on_submit() and server.owner_id == current_user.id:
        category = Category.query.filter_by(id=category_id).one()
        category_data = request.json

        category.name = category_data['name']
        db.session.commit()

        categories = Category.query.filter_by(
            server_id=category_data['serverId']).join(Channel).options(
            joinedload(
                Category.channels))

        return jsonify(nested_to_dict(categories))

    err_msgs = make_val_msgs(form.errors)

    if server.owner_id != current_user.id:
        err_msgs['auth'] = 'unauthorized'

    return jsonify({'errors': err_msgs})

# ~~~~~~~~~~~~ DELETE ~~~~~~~~~~~~~~


@categories.route('/<category_id>', methods=['DELETE'])
@login_required
def delete_category(category_id):
    category_data = request.json
    server = Server.query.filter_by(id=category_data['serverId']).one()

    if server.owner_id == current_user.id:
        category = Category.query.filter_by(id=category_id).one()
        db.session.delete(category)
        db.session.commit()

        categories = Category.query.filter_by(
            server_id=category_data['serverId']).join(Channel).options(
            joinedload(
                Category.channels))

        return jsonify(nested_to_dict(categories))

    return jsonify({'errors': 'unauthorized'})
