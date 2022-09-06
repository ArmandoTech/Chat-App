const express= require('express')
const path= require('path')
const http= require('http')
const socketio= require('socket.io')
const messageInfo=require('./utils/messages')
const { joinUser, findUser }= require('./utils/users')

const app= express()
const server= http.createServer(app)
const io= socketio(server)

// Setting port
const PORT= process.env.PORT || 3000

//Setting static files
app.use(express.static(path.join(__dirname, 'public')))


//Detects client connection
io.on('connection', socket => {

    //Joining the room
    socket.on('joinChat', ({ username, room }) => {

        const user= joinUser(socket.id, username, room)
        socket.join(user.room)


        //Only the one who connects can see the message
        socket.emit('message', messageInfo('Bot', `Welcome to ChatApp`))

        //Everyone except the one who connects can see the message
        socket.broadcast.to(user.room).emit('message', messageInfo('Bot', ` ${user.username} has joined the chat`))

        //Catching chat messages
        socket.on('chatMessage', msg => {
        io.emit('message', messageInfo(user.username, msg))

        //Everyone can see the message
        socket.on('disconnect', () => {
        io.to(user.room).emit('message', messageInfo('Bot',`${user.username} has left the chat`))
    })
    })
    })
})


//Launching server
server.listen(PORT, () => {
    console.log(`Server live on port ${PORT}`)
})
