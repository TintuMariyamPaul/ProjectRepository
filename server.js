const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./db');
require('dotenv').config();


const app = express();
app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json({ info: 'Server is up and running!' });
});


const mysqlConnection = {
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD ||'Tintu@1998', 
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
        const params = [];

        if(title){
            query += 'AND title LIKE ? ';
            params.push(`%${title}%`);;
        }
        if(category){
            query += 'AND category = ?';
            params.push(category); 
        }
        connection.connect(err => {
            if (err) {
                console.error('Database connection error:', err);
                return res.status(500).json({ error: 'Database connection failed' });
            }
    
            connection.query(query, params, (err, results) => {
            if (err) {
                    console.error('Query error:', err);
                    return res.status(500).json({ error: 'Failed to search recipes' });
                }
                if (results.length === 0) {
                    return res.status(404).json({ message: 'No recipes found matching your criteria.' });
    
                res.status(200).json(results);
                connection.end();
                } 
            });
        });
});

app.put('/recipes/:id', (req, res) => {
        const connection = mysql.createConnection(mysqlConnection);
        const { id } = req.params;
        const { title, category, ingredients, steps, cookingTime, spiceLevel, cookingMethod } = req.body;
        if (!title && !category && !ingredients && !steps && !cookingTime && !spiceLevel && !cookingMethod){
            return res.status(400).json({ error: 'need to update the feild' });
        }
    let query = 'UPDATE recipes SET ';
    const updates = [];
    const params = [];
    if (title) {
        updates.push('title = ?');
        params.push(title);
    }
    if (category) {
        updates.push('category = ?');
        params.push(category);
    }
    if (category) {
        updates.push('category = ?');
        params.push(category);
    }
    if (ingredients) {
        updates.push('ingredients = ?');
        params.push(ingredients);
    }
    if (steps) {
        updates.push('steps = ?');
        params.push(steps);
    }
    if (cookingTime) {
        updates.push('cookingTime = ?');
        params.push(cookingTime);
    }
    if (spiceLevel) {
        updates.push('spiceLevel = ?');
        params.push(spiceLevel);
    }
    if (cookingMethod) {
        updates.push('cookingMethod = ?');
        params.push(cookingMethod);
    }
    query += updates.join(', ') + ' WHERE id = ?';
    params.push(id);

    connection.connect(err => {
        if (err) {
            console.error('Database connection error:', err);
            return res.status(500).json({ error: 'Database connection failed' });
        }
        connection.connect(err => {
            if (err) {
                console.error('Database connection error:', err);
                return res.status(500).json({ error: 'Database connection failed' });
            }
    
            connection.query(query, params, (err, results) => {
                if (err) {
                    console.error('Query error:', err);
                    return res.status(500).json({ error: 'Failed to update recipe' });
                }
    
                if (results.affectedRows === 0) {
                    
                    return res.status(404).json({ message: 'Recipe not found' });
                }
    
                res.status(200).json({ message: 'Recipe updated successfully!' });
                connection.end();
            });
        });
    });
});

app.delete('/recipes/:id', (req, res) => {
    const connection = mysql.createConnection(mysqlConnection);
    const { id } = req.params;
    connection.connect(err => {
        if (err) {
            console.error('Database connection error:', err);
            return res.status(500).json({ error: 'Database connection failed' });
        }

        const query = 'DELETE FROM recipes WHERE id = ?';

        connection.query(query, [id], (err, results) => {
            if (err) {
                console.error('Query error:', err);
                return res.status(500).json({ error: 'Failed to delete recipe' });
            }

            if (results.affectedRows === 0) {
                return res.status(404).json({ message: 'Recipe not found' });
            }

            res.status(200).json({ message: 'Recipe deleted successfully!' });
            connection.end();
        });
    });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
