from .db import db

class Category(db.Model):
    __tablename__ = 'categories'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20), nullable=False)
    server_id = db.Column(
        db.Integer, db.ForeignKey('servers.id'), nullable=False)
    
    server = db.relationship('Server', back_populates='categories')
    channels = db.relationship("Channel", back_populates="category")

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'server_id': self.server_id,
        }
    
    
