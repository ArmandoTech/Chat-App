# Chat-App

App built with Node, Express, Socket.io and MySQL
It works on Localhost:3000 and you can log several times on the same pc to see how it works.\
ChatApp is a chat which counts with different rooms, room 1 can't see messages from other rooms and viceversa.\
When a user joins a room, a bot will give a welcome message and it will notify the other users that s/he joined, same
when leaving the room. \Messages, id, username, room where user write and time when message is sent
will be saved up on MySql database named "messages".\
Everytime a new user joins, his/her name is added to a users list at the left of the chat. When leaving, the name
is removed.

### Getting started

### System requirements

- NPM 8.11.0
- Express 4.18.1
- Express-myconnection 1.0.4
- Moment 2.29.4
- MySQL 2.18.1
- Socket.io 4.5.2

1. Clone the respository.

   ```shell
   git clone https://github.com/ArmandoTech/Chat-App
   cd Chat-App
   ```

2. Install all dependencies with NPM.

   ```shell
   npm install
   ```

3. Open XAMPP and turn on MySQL and Apache modules.

4. Execute development server

   ```shell
   npm run dev
   ```

5. If application is working, you can see the message "Server running on port: ${PORT} " on console.

6. Go to localhost:3000 as many times you want and log in as a different user to chat!
