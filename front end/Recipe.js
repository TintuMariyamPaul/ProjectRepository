const apiUrl = 'http://localhost:3000/recipes';


function displayRecipes() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(recipes => {
            const recipeList = document.getElementById('recipe-list-container');
            recipeList.innerHTML = ''; 

            if (recipes.length === 0) {
                recipeList.innerHTML = '<p>No recipes available.</p>';
            } else {
                recipes.forEach(recipe => {
                    const result = document.createElement('div');
                    result.classList.add('recipe-item');
                    result.innerHTML = `
                        <h4>${recipe.title}</h4>
                        <p><strong>Category:</strong> ${recipe.category}</p> 
                        <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
                        <p><strong>Steps:</strong> ${recipe.steps}</p>
                        <p><strong>Cooking Time:</strong> ${recipe.cookingTime} min</p>
                        <p><strong>Spice Level:</strong> ${recipe.spiceLevel}</p> 
                        <p><strong>Cooking Method:</strong> ${recipe.cookingMethod}</p>
                        <div class="action-buttons">
                        <button onclick="editRecipe(${recipe.id}, '${recipe.title}', 
                        '${recipe.category}', '${recipe.ingredients}', 
                        '${recipe.steps}', ${recipe.cookingTime}, 
                        '${recipe.spiceLevel}', '${recipe.cookingMethod}')">Edit</button>
                        <button onclick="deleteRecipe(${recipe.id})">Delete</button>
                        </div>
                    `;
                    recipeList.appendChild(result);
                });
            }
        })
        .catch(err => {
            console.error('Error fetching recipes:', err);
        });
}
        
function addRecipe() {
    const newRecipe = getRecipeInput();
    if (!newRecipe) return;
    
    fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRecipe)
    })
        .then(response => response.json())
        .then(() => {
            alert('Recipe added successfully!');
            displayRecipes();
        })
        .catch(err => {
            console.error('Error adding recipe:', err);
        });
}
function addRecipe() {
    const newRecipe = getRecipeInput();
    if (!newRecipe) return;
    fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRecipe)
    })
    .then(() => {
        alert('Recipe added successfully!');
        displayRecipes();
    })
    .catch(err => console.error('Error adding recipe:', err));
}
function editRecipe(id, title, category, ingredients, steps, cookingTime, spiceLevel, cookingMethod) {
    document.getElementById('recipe-title').value = title;
    document.getElementById('category').value = category;
    document.getElementById('ingredients').value = ingredients;
    document.getElementById('steps').value = steps;
    document.getElementById('cooking-time').value = cookingTime;
    document.getElementById('spice-level').value = spiceLevel;
    document.getElementById('cooking-method').value = cookingMethod;
    
    document.getElementById('add-recipe-btn').classList.add('hidden');
    document.getElementById('edit-recipe-btn').classList.remove('hidden');
    editingRecipeId = id;
}

function updateRecipe() {
    const updatedRecipe = getRecipeInput();
    if (!updatedRecipe) return;
    fetch(`${apiUrl}/${editingRecipeId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedRecipe)
    })
        .then(() => {
            alert('Recipe updated successfully!');
            resetForm();
            displayRecipes();
        })
        .catch(err => console.error('Error updating recipe:', err));
}

function searchRecipes() {
    const title = document.getElementById('search-title').value.trim();
    const category = document.getElementById('search-category').value;

    let query = `${apiUrl}?${title ? `title=${encodeURIComponent(title)}` : ''}`;
    if (category) query += `&category=${encodeURIComponent(category)}`;


    fetch(query)
        .then(response => response.json())
        .then(recipes => {
            const searchList = document.getElementById('search-results-container');
            searchList.innerHTML = ''; 

            if (recipes.length === 0) {
                searchList.innerHTML = '<p>No recipes found.</p>';
            } else {
                recipes.forEach(recipe => {
                    const result = document.createElement('div');
                    result.classList.add('recipe-item');
                    result.innerHTML = `
                        <h4>${recipe.title}</h4>
                        <p><strong>Category:</strong> ${recipe.category}</p> 
                        <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
                        <p><strong>Steps:</strong> ${recipe.steps}</p>
                        <p><strong>Cooking Time:</strong> ${recipe.cookingTime} min</p>
                        <p><strong>Spice Level:</strong> ${recipe.spiceLevel}</p> 
                        <p><strong>Cooking Method:</strong> ${recipe.cookingMethod}</p>
                    `;
                    searchList.appendChild(result);
                });
            }
        })

            .catch(err => console.error('Error searching recipes:', err));
}
function deleteRecipe(id) {
    fetch(`${apiUrl}/${id}`, { method: 'DELETE' })
        .then(() => {
            alert('Recipe deleted successfully!');
            displayRecipes();
        })
        .catch(err => console.error('Error deleting recipe:', err));
}

function getRecipeInput() {
    const title = document.getElementById('recipe-title').value.trim();
    const category = document.getElementById('category').value;
    const ingredients = document.getElementById('ingredients').value.trim();
    const steps = document.getElementById('steps').value.trim();
    const cookingTime = parseInt(document.getElementById('cooking-time').value, 10);
    const spiceLevel = document.getElementById('spice-level').value.trim();
    const cookingMethod = document.getElementById('cooking-method').value.trim();

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
