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
});

app.post('/recipes',(req,res) => {

    const { title, category, ingredients,steps,cookingTime,spiceLevel,cookingMethod} = req.body;
        if(!title || !category ||!ingredients ||!steps||!cookingTime||!spiceLevel || !cookingMethod){
            res.status(400).send({error:'All fields are required!'});
            return;
    }
    const query = `
        INSERT INTO recipes (title, category, ingredients, steps, cookingTime, spiceLevel, cookingMethod) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    db.query(query, [title, category, ingredients, steps, cookingTime, spiceLevel, cookingMethod], (err, result) => {
        if (err) {
            console.error('Error adding recipe:', err);
            res.status(500).send({ error: 'Failed to add recipe' });
            return;
        }
        res.send({ message: 'Recipe added successfully!' });
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

