let users = []

//Joining users
const joinUser = (id, username, room) => {
    const user = {
        id,
        username,
        room,
    }

    users.push(user)
    return user
}

//FindUser
const getUserById = socketId => {
    return users.find(user => user.id === socketId)
}

//FindUsers
const getUsersByRoom = room => {
    return users.filter(user => user.room === room)
}

const removeRoomUser = id => {
    users = users.filter(user => user.id !== id);
    return true
}

const getRoomUser = room => {
    return users.filter(element => element.room === room)
}

module.exports = { joinUser, getUsersByRoom, removeRoomUser, getRoomUser, getUserById }