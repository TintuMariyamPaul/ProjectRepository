const request = require('supertest');
const { app, server } = require('../server');

describe('Recipe API Integration Tests', () => {
    afterAll(() => {
        server.close();
    });

   it('should create a new recipe on POST /recipes', async () => {
        const newRecipe = {
            title: 'Test Recipe',
            category: 'Test Category',
            ingredients: 'Test Ingredients',
            steps: 'Test Steps',
            cookingTime: 30,
            spiceLevel: 'Medium',
            cookingMethod: 'Test Method',
        };

        const response = await request(app).post('/recipes').send(newRecipe);
        expect(response.statusCode).toBe(201);
        expect(response.body).toEqual({ message: 'Recipe added successfully.' });
    });

    it('should fetch a recipe by serial number on GET /recipes/:serialNumber', async () => {
        const response = await request(app).get('/recipes/1');
        expect([200, 404]).toContain(response.statusCode);
        if (response.statusCode === 200) {
            expect(response.body).toHaveProperty('serialNumber', 1);
        } else {
            expect(response.body).toEqual({ error: 'Recipe not found.' });
        }
    });
    it('should delete a recipe on DELETE /recipes/:serialNumber', async () => {
        const response = await request(app).delete('/recipes/1');
        expect([200, 404]).toContain(response.statusCode);
        if (response.statusCode === 200) {
            expect(response.body).toEqual({ message: 'Recipe deleted successfully' });
        } else {
            expect(response.body).toEqual({ message: 'Recipe not found.' });
        }
    });
    
});