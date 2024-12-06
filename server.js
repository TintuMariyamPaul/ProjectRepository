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
        const [results] = await db.query('SELECT * FROM recipes');
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
        const query = `
            INSERT INTO recipes (title, category, ingredients, steps, cookingTime, spiceLevel, cookingMethod) 
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        await db.query(query, [title, category, ingredients, steps, cookingTime, spiceLevel, cookingMethod]);
        res.status(201).json({ message: 'Recipe added successfully!' });
    } catch (err) {
        console.error('Query error:', err.message, err.sql);
        res.status(500).json({ error: 'Failed to search recipes', details: err.message });
    }
});
app.get('/search',async (req, res) => {
        const {title,category} = req.query;
        if (title) {
            title = title.replace(/["']/g, ''); 
        }
    
        if (category) {
            category = category.replace(/["']/g, '');
        }
        try {
            let query = 'SELECT * FROM recipes WHERE 1=1 ';
            const params = [];

            if (title) {
                query += 'AND title LIKE ? ';
                params.push(`%${title}%`);
            }
            if (category) {
                query += 'AND category = ? ';
                params.push(category);
            }
            console.log('Query:', query); 
            console.log('Params:', params); 
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
app.put('/recipes/:id', async (req, res) => {
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

    try {
        const [results] = await db.query(query, params);
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Recipe not found' });
        }
        res.status(200).json({ message: 'Recipe updated successfully!' });
    } catch (err) {
        console.error('Query error:', err);
        res.status(500).json({ error: 'Failed to update recipe' });
    }
});

app.delete('/recipes/:id', async (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM recipes WHERE id = ?';
    try {
        const [results] = await db.query(query, [id]);
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Recipe not found' });
        }
        res.status(200).json({ message: 'Recipe deleted successfully!' });
    } catch (err) {
        console.error('Query error:', err);
        res.status(500).json({ error: 'Failed to delete recipe' });
    }
});

app.get('/recipes', (req, res) => {
    const { title, category } = req.query;
    let filteredRecipes = recipes;

    if (title) {
        filteredRecipes = filteredRecipes.filter(recipe =>
            recipe.title.toLowerCase().includes(title.toLowerCase())
        );
    }
    if (category) {
        filteredRecipes = filteredRecipes.filter(recipe => recipe.category === category);
    }

    res.json(filteredRecipes);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
