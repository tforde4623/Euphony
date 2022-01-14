from .db import db

class Message(db.Model):
    __tablename__ = 'messages'

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    user_id = db.Column(
        db.Integer, db.ForeignKey('users.id'), nullable=False)
    channel_id = db.Column(
        db.Integer, db.ForeignKey('channels.id'), nullable=False)
    created_at = db.Column(db.DateTime,  default=db.func.current_timestamp())
    updated_at = db.Column(db.DateTime, 
                           server_default=db.func.now(), 
                           server_onupdate=db.func.now())

    user = db.relationship("User", back_populates='messages')
    channel = db.relationship("Channel", back_populates='message')

    def to_dict(self):
        return {
            'id': self.id,
            'content': self.content,
            'user_id': self.user_id,
            'channel_id': self.channel_id,
            'created_at': self.created_at, 
            'updated_at': self.updated_at
        }
