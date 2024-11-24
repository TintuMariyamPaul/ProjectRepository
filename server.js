const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
app.use(express.static('public'));
app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.json({ info: 'Server is up and running!' });
});


const mysqlConnection = {
    host: 'localhost',
    user: 'root',
    password: 'Tintu@1998', 
    database: 'kerala_cuisine',
    port: 3306
};


app.get('/recipes', (req, res) => {
    const connection = mysql.createConnection(mysqlConnection);
    const query = 'SELECT * FROM recipes';

    connection.connect(err => {
        if (err) {
            console.error('Database connection error:', err);
            return res.status(500).json({ error: 'Database connection failed' });
        }

        connection.query(query, (err, results) => {
            if (err) {
                console.error('Query error:', err);
                return res.status(500).json({ error: 'Failed to fetch recipes' });
            }

            res.status(200).json(results);
            connection.end(); 
        });
    });
});

app.post('/recipes', (req, res) => {
    const connection = mysql.createConnection(mysqlConnection);
    const { title, category, ingredients, steps, cookingTime, spiceLevel, cookingMethod } = req.body;

    // Validate request body
    if (!title || !category || !ingredients || !steps || !cookingTime || !spiceLevel || !cookingMethod) {
        return res.status(400).json({ error: 'All fields are required!' });
    }

    const query = `
        INSERT INTO recipes (title, category, ingredients, steps, cookingTime, spiceLevel, cookingMethod) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    connection.query(query, [title, category, ingredients, steps, cookingTime, spiceLevel, cookingMethod], (err, results) => {
        if (err) {
            console.error('Error adding recipe:', err);
            return res.status(500).json({ error: 'Failed to add recipe' });
        }

        res.status(201).json({ message: 'Recipe added successfully!' });
        connection.end(); 
    });
});
app.get('/search', (req, res) => {
        const connection = mysql.createConnection(mysqlConnection);
        const {title,category} = req.query;

        let query = 'SELECT * FROM recipes WHERE 1=1';
        const querysearch = [];

        if(title){
            query += 'AND title LIKE?';
            querysearch.push('%${title}%');
        }
        if(category){
            query += 'AND category = ?';
            querysearch.push(category); 
        }
        connection.connect(err => {
            if (err) {
                console.error('Database connection error:', err);
                return res.status(500).json({ error: 'Database connection failed' });
            }
    
            connection.query(query, querysearch, (err, results) => {
                if (err) {
                    console.error('Query error:', err);
                    return res.status(500).json({ error: 'Failed to search recipes' });
                }
    
                res.status(200).json(results);
                connection.end(); 
            });
        });
});
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
