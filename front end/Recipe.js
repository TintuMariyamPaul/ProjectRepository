const apiUrl = 'http://localhost:3000/recipes';
let editingRecipeId = null;

const showMessage = (message, isError = false) => {
    const responseDiv = document.getElementById('response');
    responseDiv.textContent = message;
    responseDiv.style.color = isError ? 'red' : 'green';
    setTimeout(() => (responseDiv.textContent = ''), 5000);
};

const resetForm = (formId) => {
    document.getElementById(formId).reset();
};

const toggleEditForm = (show = false) => {
    document.getElementById('add-recipe-form').classList.toggle('hidden', show);
    document.getElementById('edit-recipe-form').classList.toggle('hidden', !show);
};

const displayRecipes = async () => {
    try {
        const response = await fetch(apiUrl);
        const recipes = await response.json();

        const recipeList = document.getElementById('recipe-list-container');
        recipeList.innerHTML = recipes.length
            ? recipes.map(recipe => `
                <div class="recipe-item">
                    <h4>${recipe.title}</h4>
                    <p>Category: ${recipe.category}</p>
                    <p>Cooking Time: ${recipe.cookingTime} mins</p>
                    <button onclick="loadRecipeForEdit(${recipe.serialNumber})">Edit</button>
                    <button onclick="deleteRecipe(${recipe.serialNumber})">Delete</button>

                </div>
            `).join('')
            : '<p>No recipes available.</p>';
    } catch (error) {
        showMessage('Error loading recipes.', true);
    }
};

document.getElementById('add-recipe-btn').addEventListener('click', async () => {
    const newRecipe = getRecipeInput('add');
    if (!newRecipe) return;
    try {
           const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newRecipe)
        });

           if (!response.ok) {
            throw new Error('Error adding recipe.');
        }

           showMessage('Recipe added!');
           resetForm('add-recipe-form');
           displayRecipes();
    } catch (error) {
        showMessage('Error adding recipe.', true);
    }
});

document.getElementById('edit-recipe-btn').addEventListener('click', async () => {
    const updatedRecipe = getRecipeInput('edit');
    if (!updatedRecipe) return;

    try {
        const response = await fetch(`${apiUrl}/${editingRecipeId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedRecipe)
        });

        if (!response.ok) {
            throw new Error('Error updating recipe.');
        }

        showMessage('Recipe updated!');
        toggleEditForm(false);
        displayRecipes();
    } catch (error) {
        showMessage('Error updating recipe.', true);
    }
});

const loadRecipeForEdit = async (serialNumber) => {
    try {
        const response = await fetch(`${apiUrl}/${serialNumber}`);

        if (!response.ok) {
            throw new Error('Error loading recipe.');
        }

        const recipe = await response.json();
        editingRecipeId = serialNumber;
        document.getElementById('edit-title').value = recipe.title;
        document.getElementById('edit-category').value = recipe.category;
        document.getElementById('edit-ingredients').value = recipe.ingredients;
        document.getElementById('edit-steps').value = recipe.steps;
        document.getElementById('edit-cooking-time').value = recipe.cookingTime;
        document.getElementById('edit-spice-level').value = recipe.spiceLevel;
        document.getElementById('edit-cooking-method').value = recipe.cookingMethod;

        toggleEditForm(true);
    } catch (error) {
        showMessage('Error loading recipe for edit.', true);
    }
};

const deleteRecipe = async (serialNumber) => {
    console.log('Attempting to delete recipe with serialNumber:', serialNumber);

    try {
        const response = await fetch(`${apiUrl}/${serialNumber}`, { method: 'DELETE' });

        if (!response.ok) {
            throw new Error(`Failed to delete recipe. Status: ${response.status}`);
        }

        showMessage('Recipe deleted successfully!');
        displayRecipes(); 
    } catch (error) {
        console.error('Error deleting recipe:', error);
        showMessage('Error deleting recipe.', true);
    }
};



const search_rec = async () => {
    const title = document.getElementById('search-title').value.trim();
    const category = document.getElementById('search-category').value;
    const searchList = document.getElementById('search-results-container');

    const params = new URLSearchParams();
    if (title) params.append('title', title);
    if (category) params.append('category', category);

    const query = `${apiUrl}?${params.toString()}`;

    try {
        const response = await fetch(query);

        if (!response.ok) {
            throw new Error('Error searching recipes.');
        }

        const recipes = await response.json();

        searchList.innerHTML = recipes.length
            ? recipes.map(recipe => `
                <div class="recipe-item">
                    <h4>${recipe.title}</h4>
                    <p>Category: ${recipe.category}</p>
                    <p>Cooking Time: ${recipe.cookingTime} mins</p>
                    <p>Spice Level: ${recipe.spiceLevel}</p>
                    <p>Cooking Method: ${recipe.cookingMethod}</p>
                </div>
            `).join('')
            : '<p>No recipes found.</p>';
    } catch (error) {
        showMessage('Error searching recipes.', true);
    }
};

const getRecipeInput = (prefix) => {
    const title = document.getElementById(`${prefix}-title`).value.trim();
    const category = document.getElementById(`${prefix}-category`).value;
    const ingredients = document.getElementById(`${prefix}-ingredients`).value.trim();
    const steps = document.getElementById(`${prefix}-steps`).value.trim();
    const cookingTime = parseInt(document.getElementById(`${prefix}-cooking-time`).value, 10);
    const spiceLevel = document.getElementById(`${prefix}-spice-level`).value.trim();
    const cookingMethod = document.getElementById(`${prefix}-cooking-method`).value.trim();

    if (!title || !category || !ingredients || !steps || !cookingTime || !spiceLevel || !cookingMethod) {
        alert('Please fill out all fields.');
        return null;
    }

    return { title, category, ingredients, steps, cookingTime, spiceLevel, cookingMethod };
};

document.addEventListener('DOMContentLoaded', displayRecipes);