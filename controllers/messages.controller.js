const controller= {}

controller.save= (req, res) => {
    const data= req.body

    req.getConnection((err, conn) => {
        conn.query('INSERT INTO messages set ?', [data], (err, rows) => {
            if (err) {
                res.json(err)
            }
            res.redirect('/')
        })
    })
}

module.exports= controller