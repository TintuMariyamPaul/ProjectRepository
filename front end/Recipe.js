const apiUrl = 'https://super-duper-space-computing-machine-5rpwg6grv6j246pj-3000.app.github.dev/';
function displayrecipies() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(recipe => {
            const recipe_List = document.getElementById('recipelist');
            recipe_List.innerHTML = ''; 
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
    recipe_List = appendchild(result);
    
    });
});

function addrecipe() {  
    
    const newRecipe = {
        title: document.getElementById('recipe-title').value,
        category: document.getElementById('category').value,
        ingredients: document.getElementById('ingredients').value,
        steps: document.getElementById('steps').value,
        cookingTime: document.getElementById('cooking-time').value,
        spiceLevel: document.getElementById('spice-level').value,
        cookingMethod: document.getElementById('cooking-method').value   
};
    fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRecipe)

       .then(() => displayrecipies()) 
    }) 
