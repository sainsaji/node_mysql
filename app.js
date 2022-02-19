
const express = require('express')
const mysql = require('mysql2');
var bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config();
const script = require('./script')



const app = express();
const port = 5500

app.use(cors({
    origin:"*",
}))

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

//to insert data
app.get('/insert', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id ' + connection.threadId)
        connection.query('Insert into customer values ("11","rajesh","2 wheeler","JP nagar")', (err, rows) => {
            connection.release() 
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

//to update data
app.get('/update', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id ' + connection.threadId)
        connection.query('UPDATE  customer set customer_name="johns" where customer_id="11";', (err, rows) => {
            connection.release() 
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

app.get('/drop', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id ' + connection.threadId)
        connection.query('delete from customer where customer_id=11', (err, rows) => {
            connection.release() 
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
  
     