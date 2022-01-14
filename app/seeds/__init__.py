from flask.cli import AppGroup
from .users import seed_users, undo_users
from .categories import seed_categories, undo_categories
from .channels import seed_channels, undo_channels
from .members import seed_members, undo_members
from .messages import seed_messages, undo_messages
from .servers import seed_servers, undo_servers
from ..models import db, Server

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_servers()
    seed_categories()
    seed_channels()
    seed_members()
    seed_messages()
    # Add other seed functions here
    # after seeding all, make general default
    serv = Server.query.filter_by(id=1).one()
    serv.default_channel = 1
    db.session.commit()

# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_servers()
    undo_categories()
    undo_channels()
    undo_members()
    undo_messages()
    # Add other undo functions here
