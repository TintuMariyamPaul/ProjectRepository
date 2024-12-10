require('dotenv').config();
const request = require('supertest');
const { app, server } = require('../server'); 
const db = require('../db'); 

jest.mock('../db', () => ({
    query: jest.fn(),
}));

beforeAll(() => {
    
    if (!server.listening) {
        server.listen(3000, () => {
            console.log('Test server running on port 3000');
        });
    }
});

afterAll(() => {
   
    if (server) {
        server.close(); 
    }
});

describe('POST /recipes', () => {
    it('should add a new recipe', async () => {
        const newRecipe = {
            title: 'New Recipe',
            category: 'Vegetarian',
            ingredients: 'Ingredients',
            steps: 'Steps',
            cookingTime: '30 mins',
            spiceLevel: 'Medium',
            cookingMethod: 'Boil',
        };
        db.query.mockResolvedValue([{ insertId: 1 }]);

        const res = await request(app).post('/recipes').send(newRecipe);

        expect(res.statusCode).toBe(201);
        expect(res.body.message).toBe('Recipe added successfully.');
    });

    it('should return an error if any field is missing', async () => {
        const incompleteRecipe = {
            title: 'Incomplete Recipe',
            category: 'Vegetarian',
            ingredients: 'Ingredients',
            steps: 'Steps',
            cookingTime: '30 mins',
        };

        const res = await request(app).post('/recipes').send(incompleteRecipe);

        expect(res.statusCode).toBe(400);
        expect(res.body.error).toBe('All fields are required!');  
    });

    it('should return 500 if there is an error adding the recipe', async () => {
        const newRecipe = {
            title: 'New Recipe',
            category: 'Vegetarian',
            ingredients: 'Ingredients',
            steps: 'Steps',
            cookingTime: '30 mins',
            spiceLevel: 'Medium',
            cookingMethod: 'Boil',
        };

        db.query.mockRejectedValue(new Error('Database error'));

        const res = await request(app).post('/recipes').send(newRecipe);

        expect(res.statusCode).toBe(500);
        expect(res.body.error).toBe('Failed to add recipe.'); 
    });
});
describe('DELETE /recipes/:serialNumber', () => {
    it('should delete an existing recipe', async () => {
        db.query.mockResolvedValue([{ affectedRows: 1 }]);

        const res = await request(app).delete('/recipes/1');

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('Recipe deleted successfully');
    });

    it('should return 404 if recipe is not found', async () => {
        db.query.mockResolvedValue([{ affectedRows: 0 }]);

        const res = await request(app).delete('/recipes/999');

        expect(res.statusCode).toBe(404);
        expect(res.body.message).toBe('Recipe not found.');  
    });
});

