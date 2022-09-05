const express= require('express')
const path= require('path')
const http= require('http')
const socketio= require('socket.io')
const messageInfo=require('./utils/messages')

const app= express()
const server= http.createServer(app)
const io= socketio(server)

// Setting port
const PORT= process.env.PORT || 3000

//Setting static files
app.use(express.static(path.join(__dirname, 'public')))


//Detects client connection
io.on('connection', socket => {

    //Only the one who connects can see the message
    socket.emit('message', messageInfo('Bot', 'Welcome to ChatApp'))

    //Everyone except the one who connects can see the message
    socket.broadcast.emit('message', messageInfo('Bot', 'A user has joined the chat'))

    //Everyone can see the message
    socket.on('disconnect', () => {
        io.emit('message', messageInfo('Bot','A user has left the chat'))
    })


    //Catching chat messages
    socket.on('chatMessage', msg => {
        io.emit('message', messageInfo('user', msg))
    })
})


//Launching server
server.listen(PORT, () => {
    console.log(`Server live on port ${PORT}`)
})
