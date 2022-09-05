const socket=io()
const chatForm= document.getElementById('chat-form')

//Function to output the message 
const outputMsg= (msg) => {
    const div= document.createElement('div')
    div.classList.add('message')
    div.innerHTML= `<p class="meta">Brad <span>9:12pm</span></p>
    <p class="text">
        ${msg}
    </p>`
    document.querySelector('.chat-messages').appendChild(div)
}

socket.on('message', message => {
    outputMsg(message)
})

//Submitting a message
chatForm.addEventListener('submit', event => {
    event.preventDefault()

    //Getting message text
    const msg= event.target.elements.msg.value

    //Emiting message to the server
    socket.emit('chatMessage', msg)

})