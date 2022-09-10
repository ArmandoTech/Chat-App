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
//Aqui tu tenias roomUsers lo cambie mejor por getUsersByRoom
const getUsersByRoom = room => {
    // Lo que quieres aqui es retornar todos los usuarios conectados a la misma sala 
    return users.filter(user => user.room === room)
    // return users.find(user => user.room === room)
    //Tu tenias Find que sirve para encontrar una coincidencia solo devuelve el primero
    //Filter es mejor para y la palabra lo dice, filtra
}

//Puede ser mejor, investiga sobre hacer un objeto de objetos por ejemplo users = {{},{},{}}
const removeRoomUser = id => {

    // Puedes hacer un nuevo array a traves del filter omitiendo el id que es el usuario que deseas eliminar
    users = users.filter(user => user.id !== id);
    return true
    // const index = users.find(element => element.id === id)

    // if (index != -1) {
    //     users.splice(index, 1)[0]
    //     return true
    // }
}

const getRoomUser = room => {
    return users.filter(element => element.room === room)
}

module.exports = { joinUser, getUsersByRoom, removeRoomUser, getRoomUser, getUserById }