from typing import NamedTuple
from .db import db


class Server(db.Model):
    __tablename__ = 'servers'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(35), nullable=False)
    owner_id = db.Column(db.Integer, nullable=False)
    icon_url = db.Column(db.text)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'owner_id': self.owner_id,
            'icon_url': self.icon_url
        }

