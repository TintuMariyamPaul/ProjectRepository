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
        const { title, category, limit, offset } = req.query;

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

        const parsedLimit = parseInt(limit, 10) || 10;
        const parsedOffset = parseInt(offset, 10) || 0;

        query += ' LIMIT ? OFFSET ?';
        params.push(parsedLimit, parsedOffset);

        const [results] = await db.query(query, params);
        res.status(200).json(results);
    } catch (err) {
        console.error('Error fetching recipes:', err.message);
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

app.get('/recipes/:serialNumber', async (req, res) => {
    try {
        const { serialNumber } = req.params;
        const [results] = await db.query('SELECT * FROM recipes WHERE serialNumber = ?', [serialNumber]);

        if (results.length === 0) {
            return res.status(404).json({ error: 'Recipe not found.' });
        }

        res.status(200).json(results[0]);
    } catch (err) {
        console.error('Error fetching recipe:', err.message);
        res.status(500).json({ error: 'Failed to fetch recipe.' });
    }
});

app.put('/recipes/:serialNumber', async (req, res) => {
    const { serialNumber } = req.params;
    const { title, category, ingredients, steps, cookingTime, spiceLevel, cookingMethod } = req.body;

    if (!title && !category && !ingredients && !steps && !cookingTime && !spiceLevel && !cookingMethod) {
        return res.status(400).json({ error: 'At least one field is required to update.' });
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
    try {
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
    try {
        const { serialNumber } = req.params;
        const query = 'DELETE FROM recipes WHERE serialNumber = ?';

        const [result] = await db.query(query, [serialNumber]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Recipe not found.' });
        }

        res.status(200).json({ message: 'Recipe deleted successfully' });
    } catch (error) {
        console.error('Error deleting recipe:', error);
        res.status(500).json({ error: 'Failed to delete recipe.' });
    }
});


const server = app.listen(process.env.PORT || 3001, '0.0.0.0', () => {
    console.log(`Server is running on http://0.0.0.0:${process.env.PORT || 3000}`);
});

module.exports = { app, server };


