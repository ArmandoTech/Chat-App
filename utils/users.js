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
const findUser= id => {
    return users.find(user => user.id===id)
}


module.exports= {joinUser, findUser}