const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host = 'localhost',
    user = 'root',
    password = 'Tintu@1998',
    database: 'kerala_cuisine'

});
db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to MySQL');
})

app.get('/recipes', (req, res) => {
    const query = 'select * from recipes';
    db.query(query,(err,results) => {
        if (err) {
           res.status(500).send(err);
           return;
        }
    res.send(results);
    
   });
});
app.post