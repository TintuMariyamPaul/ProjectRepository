let recipe = []

function display() {
    const recipe_List = document.getElementById('recipelist');
    recipe_List.innerHTML = '';

    recipe.forEach((recipes,index) => {
        const result = document.createElement('div');
        result.innerHTML = `
        ${recipes.title} - 
        ${recipes.category} - 
        ${recipes.ingredients} - 
        ${recipes.steps} - 
        ${recipes.cookingTime} min - 
        ${recipes.cookingMethod} - 
        ${recipes.spiceLevel}
        <button onclick ="deleteRecipe(${index})">Delete</button>
    `;
    recipe_List = append(result);
    
    });
}

document.getElementById('add_recipe').addEventListener('click', () => {

    const newRecipe = {
        title: document.getElementById('recipe-title').value,
        category: document.getElementById('category').value,
        ingredients: document.getElementById('ingredients').value,
        steps: document.getElementById('steps').value,
        cookingTime: document.getElementById('cooking-time').value,
        spiceLevel: document.getElementById('spice-level').value,
        cookingMethod: document.getElementById('cooking-method').value
    
    
    };

    recipe.push(newRecipe);
    display();
    
    
});
function deleteRecipe(index) {
    recipe.splice(index,1);
    display();
}
