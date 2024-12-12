1. # Project Overview
The Kerala Cuisine Recipe Management App is a full-stack web application designed to allow users to manage recipes. Users can:
Add, view, search, and delete recipes.
Categorize recipes as vegetarian or non-vegetarian.
Include detailed information such as cooking time, spice levels, and cooking methods.
2. # Key Features
Recipe Management
-> Add new recipes to the database
-> View existing recipes
-> Search and filter recipes
-> Delete recipes
Categorization
-> Categorize recipes as vegetarian or non-vegetarian
Detailed Recipe Information
-> Title
-> Steps
-> Cooking time
-> Spice levels
-> Cooking methods
# # Technology Stack
# Frontend
HTML:
-> Used for creating recipe input forms
-> Displays recipe containers
JavaScript:
-> fetchRecipes(): Retrieves and displays all recipes
-> searchRecipes(): Filters recipes based on user input
-> addRecipe(): Sends new recipes to the backend
-> deleteRecipe(id): Removes recipes from the backend
# Backend
-> Node.js: Server-side runtime environment
-> Express.js: Web application framework
-> MySQL: Relational database management system
# API Endpoints
Endpoint                     Method    Description
/recipes ->                   GET       Fetches all recipes from the database
/recipes ->                   POST      Validates and inserts a new recipe
/search  ->                   GET       Retrieves recipes based on search filters
/recipes/:serialNumber        DELETE     Deletes a specific recipe by SerialNumber
/recipes/:serialNumber        PUT        Edit a specific recipe by SerialNumber

# # Project Setup
Backend Configuration

Database: MySQL
Connection: mysql.createConnection
Port: 3000
Authentication: Root user login with password

# # Database Schema
Table Name: recipes
Columns:
Recipe details 

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


