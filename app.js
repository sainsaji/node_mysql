const express = require('express')
const mysql = require('mysql2');
var bodyParser = require('body-parser')


require('dotenv').config();

const app = express();
const port = 5500

app.listen(port,()=>console.log('Listening on port: '+port));
app.use(express.json())

const pool  = mysql.createPool({
    connectionLimit : 10,
    host            : 'localhost',
    user            : 'root',
    password        : '',
    database        : 'tow_service_db'
})

app.get('/display', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id ' + connection.threadId)
        connection.query('SELECT * from customer', (err, rows) => {
            connection.release() // return the connection to pool

            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }

            // if(err) throw err
            console.log('The data from customer table are: \n', rows)
        })
    })
})