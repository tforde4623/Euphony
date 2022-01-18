# Euphony

## Summary
[Euphony](https://euphony-web.herokuapp.com/) is a chatting app based loosely off of Discord. Users can create and join servers, create channels, categorize their channels, and chat with other users. It was built using React and Redux for the frontend, and Python, Flask SQL Alchemy, and PostgreSQL for the backend. 

## Run Locally
1. Clone Repository
2. Run '''pipenv install''' in root
3. Run '''flask db upgrade''' in root
4. Run '''flask db seed all''' in root
5. Go into react-app/src/components/ShowAllMessages/index.js and replace line 27 with 'sock = io(<localhost that flask is running on);'''
7. Run 'npm install''' in react-app dir
8. In two different windows run:
      1. '''pipenv run flask run'''
      2. '''npm start'''

#### Core features: 
- Create an account
- Log in to your account
- Log in as a demo user
- Create, edit, update, and delete:
   - Servers
   - Categories
   - Channels
   - Messages
- Join servers
- See who else has joined your servers


## Technologies Used
Frontend: 
- React
- Redux
Backend: 
- Python
- PostgreSQL
- Flask SQLAlchemy

## Splash
On the splash page, you can choose to create an account, log in to your existing account, or log in as a demo user. It features four current servers. Clicking on the servers will take you to a page that'll allow you to join servers.

![Imgur](https://i.imgur.com/1DT7ZgQ.png)

## Servers
Create, edit, and delete servers
![Imgur](https://i.imgur.com/C8XaiLH.png)

Join servers
![Imgur](https://i.imgur.com/5HjZavw.png)

## Categories, Channels, Messages
The owner of a channel can create channels, categories, and edit server details. All members of the server can send messages to all of the server's channels.

![Imgur](https://i.imgur.com/ilBHzfp.png)
