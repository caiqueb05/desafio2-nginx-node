const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};
const mysql = require('mysql')

app.get('/', (req, res) => {
    const connection = mysql.createConnection(config)
    connection.connect()

    const sqlCreateTable = `CREATE TABLE IF NOT EXISTS people (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL
    )`;
    connection.query(sqlCreateTable, (err, result) => {
        if (err) throw err
        console.log("Table created")

        const sqlInsert = `INSERT INTO people(name) values('Caique')`
        connection.query(sqlInsert, (err, result) => {
            if (err) throw err
            console.log("1 record inserted")

            const sqlSelect = `SELECT * FROM people`
            connection.query(sqlSelect, (err, result) => {
                if (err) throw err
                res.send('<h1>Full Cycle Rocks!</h1><br>' + JSON.stringify(result))
                connection.end()
            })
        })
    })
})

app.listen(port, () => {
    console.log('Rodando na porta ' + port)
})
