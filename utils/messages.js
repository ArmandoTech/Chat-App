const moment= require('moment')

const messageInfo= (user, msg) => {
    return {
        user, 
        msg,
        time: moment().format('h:mm a')
    }
}

module.exports= messageInfo