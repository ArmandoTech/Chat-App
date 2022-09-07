const socket=io()
const chatForm= document.getElementById('chat-form')
const chatMsg= document.querySelector('.chat-messages')
const roomName= document.getElementById('room-name')
const roomUsers= document.getElementById('users')

//Function to output the message 
const outputMsg= (msg) => {
    const div= document.createElement('div')
    div.classList.add('message')
    div.innerHTML= `<p class="meta">${msg.user} <span>${msg.time}</span></p>
    <p class="text">
        ${msg.msg}
    </p>`
    document.querySelector('.chat-messages').appendChild(div)
}

//Getting user and room
const { username, room }= Qs.parse(location.search, {
    ignoreQueryPrefix: true
})

//Emitting joinroom event
socket.emit('joinChat', { username, room })

socket.on('message', message => {
    outputMsg(message)

    //Always be at the last message
    chatMsg.scrollTop= chatMsg.scrollHeight
})

//Submitting a message
chatForm.addEventListener('submit', event => {
    event.preventDefault()

    //Getting message text
    const msg= event.target.elements.msg.value

    //Emiting message to the server
    socket.emit('chatMessage', msg)

    //Clearing the input after message
    event.target.elements.msg.value=''
    event.target.elements.msg.focus()

})


//display room name function
const displayRoomName= room => {
    roomName.innerHTML= room
}

//display users in the room function
const displayRoomUsers= users => {
    roomUsers.innerHTML= `
    ${users.map(element => `<li>${element.username}</li>`).join()}`
}

//displaying room name and users in the room
socket.on('roomUser', ({room, users}) => {
    displayRoomName(room)
    displayRoomUsers(users)
})