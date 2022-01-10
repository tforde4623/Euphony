from .db import db
from .members import Member


class Server(db.Model):
    __tablename__ = 'servers'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(35), nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    icon_url = db.Column(db.Text)

    users = db.relationship("User", secondary=Member, back_populates="members")
    channels = db.relationship("Channel", back_populates="server")
    owner = db.relationship("User", back_populates="servers")
    categories = db.relationship("Category", back_populates="server")

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'owner_id': self.owner_id,
            'icon_url': self.icon_url
        }
