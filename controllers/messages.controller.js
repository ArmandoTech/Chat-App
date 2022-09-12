const controller= {}

controller.save= (req, res) => {
    const {username, room}= req.query
    const {id, message, time}= req.body
    console.log(id, message, time)
    req.getConnection((err, conn) => {
        conn.query('INSERT INTO messages set ?', [id, username, room, message, time], (err, rows) => {
            if (err) {
                res.json(err)
            }
            res.redirect('/')
        })
    })
}

module.exports= controller