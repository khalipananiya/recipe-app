// Fetch meal data from the API using an arrow function
const fetchMeals = async () => {
    try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=chicken');
        const data = await response.json();
        displayMeals(data.meals);
    } catch (error) {
        console.error('Error fetching meal data:', error);
    }
}

// Display meals on the page using an arrow function
const displayMeals = (meals) => {
    const mealList = document.getElementById('meal-list');
    
    mealList.innerHTML = ''; // Clear existing content

    meals.forEach(meal => {
        const ingredients = getIngredients(meal);
        const mealCard = document.createElement('div');
        mealCard.classList.add('meal-card');

        mealCard.innerHTML = `
            <div class="meal-card">
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <h2 class="meal-title">${meal.strMeal}</h2>
                <p class="meal-description">${meal.strInstructions.substring(0, 150)}...</p>
                <ul class="meal-ingredients">
                    ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
                </ul>
                <a href="${meal.strYoutube}" target="_blank" class="meal-video-link">watch video</a>
            </div>
        `;

        mealList.appendChild(mealCard);
    });
}

// Extract ingredients from the meal object using an arrow function
const getIngredients = (meal) => {
    let ingredients = [];
    for (let i = 1; i <= 5; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
        }
    }
    return ingredients;
}

// Initialize the app
fetchMeals();