require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
const cors = require('cors');
app.use(cors());
app.use(bodyParser.json());

app.get('/', async (req, res) => {
    res.json({ info: 'Server is up and running!' });
});

app.get('/recipes', async (req, res) => {
    try {
        const [results] = await db.query('SELECT * FROM recipes ORDER BY serialNumber');
        res.status(200).json(results);
    } catch (err) {
        console.error('Query error:', err);
        res.status(500).json({ error: 'Failed to fetch recipes' });
    }
});
app.post('/recipes', async (req, res) => {
    const { title, category, ingredients, steps, cookingTime, spiceLevel, cookingMethod } = req.body;

    if (!title || !category || !ingredients || !steps || !cookingTime || !spiceLevel || !cookingMethod) {
        return res.status(400).json({ error: 'All fields are required!' });
    }

    try {
        await db.query(
            'INSERT INTO recipes (title, category, ingredients, steps, cookingTime, spiceLevel, cookingMethod) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [title, category, ingredients, steps, cookingTime, spiceLevel, cookingMethod]
        );
        res.status(201).json({ message: 'Recipe added successfully.' });
    } catch (error) {
        console.error('Error adding recipe:', error);
        res.status(500).json({ error: 'Failed to add recipe.' });
    }
});

app.get('/search',async (req, res) => {
    try {
        const { title, category } = req.query;

        let query = 'SELECT * FROM recipes WHERE 1=1';
        const params = [];

        if (title) {
            query += ' AND title LIKE ?';
            params.push(`%${title}%`);
        }
        if (category) {
            query += ' AND category = ?';
            params.push(category);
        }

        const [results] = await db.query(query, params);

        if (results.length === 0) {
            return res.status(404).json({ message: 'No recipes found matching your criteria.' });
        }

        res.status(200).json(results);
    } catch (err) {
        console.error('Query error:', err);
        res.status(500).json({ error: 'Failed to search recipes' });
    }
});

app.put('/recipes/:serialNumber', async (req, res) => {
        const { serialNumber } = req.params;
        const { title, category, ingredients, steps, cookingTime, spiceLevel, cookingMethod } = req.body;
        if (!title && !category && !ingredients && !steps && !cookingTime && !spiceLevel && !cookingMethod){
            return res.status(400).json({ error: 'need to update the feild' });
        }
    let query = 'UPDATE recipes SET ';
    const updates = [];
    const params = [];
    try{
        if (title) {
            updates.push('title = ?');
            params.push(title);
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
        query += updates.join(', ') + ' WHERE serialNumber = ?';
        params.push(serialNumber);

        const [result] = await db.query(query, params);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Recipe not found.' });
        }

        res.status(200).json({ message: 'Recipe updated successfully!' });
    } catch (err) {
        console.error('Query error:', err);
        res.status(500).json({ error: 'Failed to update recipe.' });
    }
});

app.delete('/recipes/:serialNumber', async (req, res) => {
    const { serialNumber } = req.params;
    
    try {
        const [result] = await db.query('DELETE FROM recipes WHERE serialNumber = ?', [serialNumber]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Recipe not found.' });
        }
        res.status(200).send({ message: 'Recipe deleted and IDs reordered.' });
    }  catch (error) {
        console.error('Error deleting and reordering recipes:', error);
        res.status(500).send({ error: 'Failed to delete and reorder recipes.' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
