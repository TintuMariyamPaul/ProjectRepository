const apiUrl = 'http://localhost:3000/recipes';
let editingRecipeId = null;

function resetForm(formId) {
    document.getElementById(formId).reset();
}

function toggleEditForm(show = false) {
    document.getElementById('edit-recipe-form').classList.toggle('hidden', !show);
    document.getElementById('add-recipe-form').classList.toggle('hidden', show);
}
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
                    const recipeItem = `
                        <div class="recipe-item">
                            <h4>${recipe.title}</h4>
                            <p><strong>Category:</strong> ${recipe.category}</p>
                            <p><strong>Cooking Time:</strong> ${recipe.cookingTime} mins</p>
                            <button onclick="loadRecipeForEdit(${recipe.id})">Edit</button>
                            <button onclick="deleteRecipe(${recipe.id})">Delete</button>
                        </div>`;
                    recipeList.innerHTML += recipeItem;
                });
            }
        })
        .catch(err => console.error('Error displaying recipes:', err));
} 

