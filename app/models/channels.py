from .db import db

class Channel(db.Model):
    __tablename__ = 'channels'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20), nullable=False)
    server_id = db.Column(
        db.Integer, db.ForeignKey('servers.id'), nullable=False)
    category_id = db.Column(
      db.Integer, db.ForeignKey('categories.id'))
    
    server = db.relationship("Server", back_populates="channels", foreign_keys=server_id)
    message = db.relationship("Message", back_populates="channel", cascade="all, delete")
    category = db.relationship("Category", back_populates="channels")

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'server_id': self.server_id,
            'category_id': self.category_id
        }
