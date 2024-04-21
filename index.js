let searchButton = document.getElementById("searchButton");
searchButton.addEventListener("click", function() {
    let searchInput = document.getElementById("searchInput").value;
    let selectElement = document.getElementById("searchOptions"); 
    let searchCriteria = selectElement.options[selectElement.selectedIndex].value;

    switch (searchCriteria) {
        case "name":
            searchByName(searchInput);
            break;
        case "category":
            searchByCategory(searchInput);
            break;
        case "ingredient":
            searchByIngredient(searchInput);
            break;
        case "area":
            searchByArea(searchInput);
            break;
        default:
            console.log("Invalid search criteria");
    }
});

function searchByName(searchInput) {
    let url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`;
    fetchMeals(url);
}

function searchByCategory(searchInput) {
    let url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${searchInput}`;
    fetchMeals(url);
}

function searchByIngredient(searchInput) {
    let url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}`;
    fetchMeals(url);
}

function searchByArea(searchInput) {
    let url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${searchInput}`;
    fetchMeals(url);
}

function fetchMeals(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            let meals = data.meals;
            let resultDiv = document.getElementById("result");
            resultDiv.innerHTML = "";

            meals.forEach(meal => {
                let mealDiv = document.createElement("div");
                mealDiv.classList.add("meal");
                mealDiv.innerHTML = `
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                    <h2>${meal.strMeal}</h2>
                    <p>${meal.strCategory}</p>
                    <p>${meal.strArea}</p>
                    <p>${meal.strInstructions}</p>
                `;
                resultDiv.appendChild(mealDiv);
            });
        })
        .catch(error => console.log(error));
}

function fetchMeals(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            let meals = data.meals;
            let resultDiv = document.getElementById("result");
            resultDiv.innerHTML = "";

            if (!meals) {
                resultDiv.innerHTML = "<p>No se encontraron resultados</p>";
                return;
            }

            // Limitar la cantidad de resultados a mostrar
            meals = meals.slice(0, 18);

            meals.forEach(meal => {
                let mealCard = document.createElement("div");
                mealCard.classList.add("meal-card");
                mealCard.innerHTML = `
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                    <p>${meal.strMeal}</p>
                `;
                resultDiv.appendChild(mealCard);

                mealCard.addEventListener("click", () => {
                    loadMealInfo(meal.idMeal);
                });
            });
        })
        .catch(error => console.log(error));
}

function loadMealInfo(mealId) {
    let url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            let meal = data.meals[0];
            // Aquí debes mostrar la información detallada del plato, por ejemplo:
            alert(`Información detallada de ${meal.strMeal}:\n${meal.strInstructions}`);
        })
        .catch(error => console.log(error));
}

