const searchBox = document.querySelector('.searchBox');
const searchBtn = document.querySelector('.searchBtn');
const recipeContainer = document.querySelector('.recipe-container');
const recipeDetailsContent = document.querySelector('.recipe-details-content');
const recipeCloseBtn = document.querySelector('.recipe-close-btn');

// Function to get recipes
const fetchRecipes = async (query) => {
    recipeContainer.innerHTML = "<h2>Fetching Recipes...</h2>";
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response = await data.json();

    recipeContainer.innerHTML = "";
    if (response.meals) {
        response.meals.forEach(meal => {
            const recipeDiv = document.createElement('div');
            recipeDiv.classList.add('recipe');
            recipeDiv.innerHTML = `
                <img src="${meal.strMealThumb}" alt="Recipe Image">
                <h3>${meal.strMeal}</h3>
                <p><span>${meal.strArea}</span> Dish</p>
                <p>Belongs to <span>${meal.strCategory}</span> Category</p>
            `;

            const button = document.createElement('button');
            button.textContent = "View Recipe";
            recipeDiv.appendChild(button);

            // Adding EventListener to recipe button
            button.addEventListener('click', () => {
                openRecipePopup(meal);
            });

            recipeContainer.appendChild(recipeDiv);
        });
    } else {
        recipeContainer.innerHTML = "<h2>No recipes found. Try another search.</h2>";
    }
};

// Function to fetch ingredients and measurements
const fetchIngredients = (meal) => {
    let ingredientsList = "";
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`]; // Corrected
        if (ingredient) { // Corrected
            const measure = meal[`strMeasure${i}`]; // Corrected
            ingredientsList += `<li>${measure} ${ingredient}</li>`; // Corrected
        } else {
            break;
        }
    }
    return ingredientsList;
};

const openRecipePopup = (meal) => {
    recipeDetailsContent.innerHTML = `
       <h2 class="recipeName">${meal.strMeal}</h2>
       <h3>Ingredients:</h3>
       <ul class="ingredientList">${fetchIngredients(meal)}</ul>
       <div class="recipeInstructions">
        <h3>Instructions:</h3>
        <p>${meal.strInstructions}</p>
    </div>
    `
    
    recipeDetailsContent.parentElement.style.display = "block";
};

// Close recipe popup
recipeCloseBtn.addEventListener('click', () => {
    recipeDetailsContent.parentElement.style.display = "none";
});

searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const searchInput = searchBox.value.trim();
    if (searchInput) {
        
        fetchRecipes(searchInput);
    }
}); 
