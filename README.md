Project Overview
The Kerala Cuisine Recipe Management App is a full-stack web application designed to allow users to manage recipes. Users can:
Add, view, search, and delete recipes.
Categorize recipes as vegetarian or non-vegetarian.
Include detailed information such as cooking time, spice levels, and cooking methods.
# ProjectRepository
created HTML file
created base javascript file
installed all the packages required json
installed packages for node, mysql2
created a server.js file and express server is correctly set up and listens on port 3000
made port:3000 public
created a mysql.createConnection instance for each endpoint
login -> mysql -u root -p->password
created table 'recipe' in mysql 
Backend API
/recipes (GET): Fetches all recipes from the recipes table 
 /recipes (POST): Validates input and inserts a new recipe into the recipes table in postman
GET /search: Retrieves recipes based on search filters.
DELETE /recipes/:id: Deletes a recipe by ID.
# Technology Stack
Frontend
-HTML
-Javascript
--HTML: The form for adding recipes and the container for displaying recipes.
--JavaScript:
fetchRecipes(): Fetches and displays all recipes.
searchRecipes(): Filters recipes based on user input.
addRecipe(): Adds a recipe to the backend.
deleteRecipe(id): Deletes a recipe from the backend.
Backend
-Node.js
Tool
-Visual Studio Code (IDE)
-Postman (API testing)
-GitHub
-MYSQL Workbench

# Reference
-W3Schools. (2024). HTML Forms. Available at: https://www.w3schools.com/html/html_forms.asp
-Ahmed,J.,2023. CRUD REST API with Node.js, Express.js, and PostgressSQL.[online] DEV Community.https://dev.to/justahmed99/crud-rest-api-with-nodejs-expressjs-and-postgresql-57b2 


