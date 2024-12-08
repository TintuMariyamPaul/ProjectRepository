const apiUrl = 'http://localhost:3000/recipes';
let editingRecipeId = null;

function resetForm(formId) {
    document.getElementById(formId).reset();
}

function toggleEditForm(show = false) {
    document.getElementById('add-recipe-form').classList.toggle('hidden', show);
}
function toggleEditForm(isVisible) {
    const editForm = document.getElementById('edit-recipe-form');
    if (isVisible) {
        editForm.classList.remove('hidden');
    } else {
        editForm.classList.add('hidden');
    }
}


function displayRecipes() {
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error fetching recipes: ${response.status}`);
            }
            return response.json();
        })
        .then(recipes => {
            const recipeList = document.getElementById('recipe-list-container');
            recipeList.innerHTML = '';
            if (recipes.length === 0) {
                recipeList.innerHTML = '<p>No recipes available.</p>';
            } else {
                recipes.forEach(recipe => {
                    const recipeItem = `
                        <div class="recipe-item">
                            <h4>${recipe.title}</h4>
                            <p><strong>Category:</strong> ${recipe.category}</p>
                            <p><strong>Cooking Time:</strong> ${recipe.cookingTime} mins</p>
                            <button onclick="loadRecipeForEdit(${recipe.serialNumber})">Edit</button>
                            <button onclick="deleteRecipe(${recipe.serialNumber})">Delete</button>
                        </div>`;
                    recipeList.innerHTML += recipeItem;
                });
            }
        })
        .catch(err => console.error('Error displaying recipes:', err));
}

function addRecipe() {
    const newRecipe = getRecipeInput('add');
    if (!newRecipe) return;
    console.log('New Recipe:', newRecipe);

    fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRecipe),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error adding recipe: ${response.status}`);
        }
        alert('Recipe added!');
        resetForm('add-recipe-form');
        displayRecipes();
    })
    .catch(err => console.error('Error adding recipe:', err));
}

function loadRecipeForEdit(serialNumber) {
    console.log('Edit Recipe Serial Number:', serialNumber);
    fetch(`${apiUrl}/${serialNumber}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error fetching recipe: ${response.status}`);
            }
            return response.json();
        })
        .then(recipe => {
            console.log('Loaded Recipe:', recipe);
            editingRecipeId = serialNumber;
            document.getElementById('edit-title').value = recipe.title;
            document.getElementById('edit-category').value = recipe.category;
            document.getElementById('edit-ingredients').value = recipe.ingredients;
            document.getElementById('edit-steps').value = recipe.steps;
            document.getElementById('edit-cooking-time').value = recipe.cookingTime;
            document.getElementById('edit-spice-level').value = recipe.spiceLevel;
            document.getElementById('edit-cooking-method').value = recipe.cookingMethod;
            toggleEditForm(true);
        })
        .catch(err => console.error('Error loading recipe for edit:', err));
}

function updateRecipe() {
    const updatedRecipe = getRecipeInput('edit');
    if (!updatedRecipe) return;

    fetch(`${apiUrl}/${editingRecipeId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedRecipe),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error updating recipe: ${response.status}`);
            }
            alert('Recipe updated!');
            resetForm('edit-recipe-form');
            toggleEditForm(false);
            displayRecipes();
        })
        .catch(err => console.error('Error updating recipe:', err));
}

function deleteRecipe(serialNumber) {
    console.log('Delete Recipe Serial Number:', serialNumber);
    fetch(`${apiUrl}/${serialNumber}`, {
        method: 'DELETE',
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error deleting recipe: ${response.status}`);
            }
            alert('Recipe deleted!');
            displayRecipes();
        })
        .catch(err => console.error('Error deleting recipe:', err));
}

function searchRecipes() {
    const title = document.getElementById('search-title').value.trim();
    const category = document.getElementById('search-category').value;

    let query = `${apiUrl}?`;
    if (title) query += `title=${encodeURIComponent(title)}`;
    if (category) query += `${title ? '&' : ''}category=${encodeURIComponent(category)}`;
    query = query.slice(0, -1);
    console.log('Search Query:', query);

    fetch(query)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error searching recipes: ${response.status}`);
            }
            return response.json();
        })
        .then(recipes => {
            console.log('Search Results:', recipes);
            const searchList = document.getElementById('search-results-container');
            searchList.innerHTML = '';
            if (recipes.length === 0) {
                searchList.innerHTML = '<p>No recipes found.</p>';
            } else {
                recipes.forEach(recipe => {
                    const result = `
                        <div class="recipe-item">
                            <h4>${recipe.title}</h4>
                            <p><strong>Category:</strong> ${recipe.category}</p>
                            <p><strong>Cooking Time:</strong> ${recipe.cookingTime} mins</p>
                            <p><strong>Spice Level:</strong> ${recipe.spiceLevel}</p>
                            <p><strong>Cooking Method:</strong> ${recipe.cookingMethod}</p>
                        </div>`;
                    searchList.innerHTML += result;
                });
            }
        })
        .catch(err => console.error('Error searching recipes:', err));
}

function getRecipeInput(prefix) {
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
}

document.getElementById('add-recipe-btn').addEventListener('click', addRecipe);
document.getElementById('edit-recipe-btn').addEventListener('click', updateRecipe);
document.getElementById('search-btn').addEventListener('click', searchRecipes);
document.getElementById('display-all-btn').addEventListener('click', displayRecipes);

displayRecipes();
