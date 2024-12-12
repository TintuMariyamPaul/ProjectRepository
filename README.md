Student Name and Number as per student card: Tintu Mariyam Paul (20048768)

Programme: Msc Information with computing

Lecturer Name: Paul Laird

Module/Subject Title: Programming for Information Systems

Assignment Title: Kerala Cusine Recipe Management App

# Kerala Cusine Recipe Management App
  
  # INTRODUCTION

The Kerala Cuisine Recipe Management App is a comprehensive web application created to assist users in managing and discovering recipes related to Kerala cuisine. The app allows users to add, view, search for, and delete recipes, emphasizing the classification of them as vegetarian or non-vegetarian. It includes information like cooking duration, spice intensity, ingredients, and preparation techniques.


  # Project Overview
The Kerala Cuisine Recipe Management App is a full-stack web application designed to allow users to manage recipes. Users can:
Add, view, search, and delete recipes.
Categorize recipes as vegetarian or non-vegetarian.
Include detailed information such as cooking time, spice levels, and cooking methods.
  # key Features
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

 # Technology Stack
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
-> Server Setup: Explanation of the Express server setup (server.js), including the connection to MySQL and setting up endpoints:
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
Database Name:kerala_cuisine
Table Name: recipes
Columns:
Recipe details 
# API Testing with Postman
Postman Usage:
Postman is used to test the backend API.
API requests for GET /recipes, POST /recipes, GET /search, DELETE /recipes/serialNumber and PUT /recipes/SerialNumber

# Github
GitHub serves as the central repository for the project, storing the backend, frontend, and database-related code files.
It enables version control, ensuring that any changes made to the code can be tracked, rolled back, or merged efficiently.

# Implementation explaination
  1. # Backend(server.js)
      -> Purpose: The backend (server.js) serves as the foundation of application, processing requests from the frontend and communicating with the database (MySQL) to handle recipes.Built using Node.js, Express, and MySQL, the backend handles data storage, retrieval, and API management for seamless communication between the server and the user interface.

      -> Capabilities:
           Express Configuration: The server is developed with Express.js, a well-known Node.js framework for creating APIs. It waits for incoming HTTP requests.
           Routes: You establish routes to manage requests such as GET, POST, PUT, and DELETE for engaging with recipes. Every route represents a particular action, like fetching recipes, adding a new one, modifying an existing recipe, or removing a recipe.

      -> Database Interaction: The server interacts with the MySQL database using SQL queries. For instance:
           GET request retrieves all recipes or a specific recipe.
           POST request adds a new recipe to the database.
           PUT and DELETE requests update and delete recipes, respectively.
      -> Error Handling: The server includes error handling to manage unexpected issues, such as when a recipe cannot be found or added.
   2. # Frontend(Recipe.js)
      -> Purpose: recipe.js is the JavaScript file that manages dynamic actions on the frontend, including retrieving recipe data from the server, showing it, and submitting new recipes.

      -> Functionality:

            API Requests: It makes requests to the backend API (using fetch or axios) to execute tasks such as adding or viewing recipes.

            Event Listeners: The script monitors events such as form submissions or button clicks to communicate with the server (e.g., adding a new recipe).

            DOM Manipulation: Once the data from the backend is obtained, recipe.js modifies the HTML DOM to show the recipe list or feedback messages (such as success or error).
   3. # Frontend(recipe.html)
      -> Purpose: The HTML document establishes the framework of the webpage where users engage with the application, including adding new recipes or browsing a recipe list.

      -> Functionality:

             Recipe Addition Form: It contains a form that allows users to input details about a recipe (title, components, steps, etc.). This form links to the frontend JavaScript file to send the information to the backend.

             Showing Recipes: It includes areas for showcasing recipes fetched from the backend, typically in a list format, featuring information like the title, ingredients, and preparation time.

             Dynamic Content: The recipe.html file is updated in real-time according to user actions, like adding or removing a recipe, utilizing JavaScript for content modification.

#This setup creates a full-stack application where the backend handles the data processing and storage, while the frontend provides an interactive interface for users to manage and view recipes.

# Unit Testing and Integration Testing
The test code validates the backend functionality of the Kerala Cuisine Recipe Management App using Jest and Supertest. 

   
   #Unit Tests:

-> POST /recipes: Ensures adding recipes works correctly:
         -> Successful addition returns status 201.
         -> Incomplete data is handled with status 400.
         -> Simulated database errors return status 500.
-> DELETE /recipes/:serialNumber: Tests recipe deletion:
       -> Existing recipes are deleted successfully with status 200.
       -> Non-existent recipes return 404.
    
    #Integration Tests
        -> Simulates end-to-end scenarios for creating, fetching, and deleting recipes.
        -> Verifies data flow between API routes, middleware, and the database.
        -> Ensures proper handling of success (201/200) and error cases (404).

   # Conclusion
   
The Kerala Cuisine Recipe Management App effectively showcases the combination of backend and frontend technologies to provide a practical, user-friendly platform for organizing recipes. By effectively utilizing Node.js, Express, MySQL, and JavaScript, the application accomplishes dynamic and dependable functions like adding, searching, and removing recipes.

The initiative emphasizes the significance of clean code structure, API creation, and user interface design. By concentrating on Kerala cuisine, it highlights cultural conservation while employing contemporary web development techniques. This initiative offers a scalable base for future improvements, including user authentication, sophisticated search functionalities, or mobile compatibility, guaranteeing its significance and flexibility for wider audiences.


# Reference
-W3Schools. (2024). HTML Forms. Available at: https://www.w3schools.com/html/html_forms.asp
-Ahmed,J.,2023. CRUD REST API with Node.js, Express.js, and PostgressSQL.[online] DEV Community.https://dev.to/justahmed99/crud-rest-api-with-nodejs-expressjs-and-postgresql-57b2 


