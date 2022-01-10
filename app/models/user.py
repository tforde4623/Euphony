from .db import db
from .members import Member
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), nullable=False, unique=True)
    email = db.Column(db.String(100), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    icon_url = db.Column(db.Text)

    members = db.relationship("Server", secondary=Member, back_populates="users")
    servers = db.relationship("Server", back_populates="owner")
    messages = db.relationship("Message", back_populates="user")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'icon_url': self.icon_url
        }
