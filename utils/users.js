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

const removeRoomUser= id => {
    const index= users.find(element=> element.id=== id)

    if (index != -1) {
        return users.splice(index, 1)[0]
    }
}

const getRoomUser= room => {
    return users.filter(element => element.room=== room)
}

module.exports= {joinUser, roomUsers, removeRoomUser, getRoomUser}