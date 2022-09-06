const users= []

//Joining users
const joinUser= (id, username, room) => {
    const user={
        id,
        username,
        room,
    }

    users.push(user)
    return user
}

//FindUser
const roomUsers= room => {
    return users.find(user => user.room===room)
}


module.exports= {joinUser, roomUsers}