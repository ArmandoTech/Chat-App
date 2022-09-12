# Chat-App

App built with Node, Express and Socket.io
It works on Localhost:3000 and you can log several times on the same pc in order to see how it works.
ChatApp is a chat which counts with different rooms, room 1 can't see messages from other rooms and viceversa.
When a user joins a room, a bot will give a welcome message and it will notify the other users that s/he joined, same 
when leaving the room.Messages, id, username, the room where people write and time when they write
will be saved up on MySql database named "messages".
Everytime a new user joins, his/her name is added to a users list at the left of the chat. When leaving, the name
is removed.

