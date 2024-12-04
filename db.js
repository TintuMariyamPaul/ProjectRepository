const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./db'); 

const app = express();
app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json({ info: 'Server is up and running!' });
});

app.get('/recipes', (req, res) => {
    const query = 'SELECT * FROM recipes';

    connection.query(query, (err, results) => {
        if (err) {
            console.error('Query error:', err);
            return res.status(500).json({ error: 'Failed to fetch recipes' });
        }

        res.status(200).json(results);
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
