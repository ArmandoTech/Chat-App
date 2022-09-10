const express = require('express')
const path = require('path')
const http = require('http')
const socketio = require('socket.io')
const messageInfo = require('./utils/messages')
const { joinUser, removeRoomUser, getUsersByRoom, getUserById } = require('./utils/users')
const mysql= require('mysql')
const myConnection= require('express-myconnection')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

//Setting database
const dbOptions= {
    host: 'localhost',
    database: 'chatapp',
    user: 'root',
    password: '',
}

app.use(myConnection(mysql, dbOptions, 'single'))

//Setting port
const PORT = process.env.PORT || 3000

//Setting static files
app.use(express.static(path.join(__dirname, 'public')))


//Detects client connection
io.on('connection', socket => {

    //Joining the room
    socket.on('joinChat', ({ username, room }) => {
        const user = joinUser(socket.id, username, room)
        socket.join(user.room)

        //Only the one who connects can see the message
        socket.emit('message', messageInfo('Bot', `Welcome to ChatApp`))

        //Everyone except the one who connects can see the message
        socket.broadcast.to(user.room).emit('message', messageInfo('Bot', ` ${user.username} has joined the chat`))

        io.to(user.room).emit('roomUser', {
            room: user.room,
            users: getUsersByRoom(user.room),
        })
    })

    //Catching chat messages
    socket.on('chatMessage', payload => {
        io.to(payload.room).emit('message', messageInfo(payload.username, payload.msg))
        //Everyone can see the message
    })

    socket.on('disconnect', () => {
        const userToRemove = getUserById(socket.id)

        if (!userToRemove)
            return

        socket.broadcast.to(userToRemove.room).emit('message', messageInfo('Bot', `${userToRemove.username} has left the chat`))

        removeRoomUser(userToRemove.id)

        // Users and room info
        socket.broadcast.to(userToRemove.room).emit('roomUser', {
            room: userToRemove.room,
            users: getUsersByRoom(userToRemove.room),
        })

    })

})


//Launching server
server.listen(PORT, () => {
    console.log(`Server live on port ${PORT}`)
})
