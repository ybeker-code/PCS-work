(async function () {
    'use strict';
    const recipeListDisplay = document.querySelector('#recipeListDisplay');
    const recipeDom = document.querySelector('#recipeName');
    const ingredientListDom = document.querySelector('#ingredientList');
    const image = document.querySelector('#image');
    try {
        const r = await fetch('recipes.json');
        if (!r.ok) {
            throw new Error(`${r.status} - ${r.statusText}`);
        }
        const recipeList = await r.json();
        recipeList.forEach(element => {
            const newOption = document.createElement("option");
            newOption.textContent = element.name;
            recipeListDisplay.appendChild(newOption);
        });
    }
    catch (e) {
        console.error(e);
    };
    recipeListDisplay.addEventListener('change', GetRecipe);

    async function GetRecipe(event) {
        try {
            const r = await fetch(`${event.target.value}.json`);
            if (!r.ok) {
                throw new Error(`${r.status} - ${r.statusText}`);
            }
            const recipe = await r.json();
            recipeDom.textContent = recipe.name;
            image.setAttribute('src', recipe.picture);
            image.style.display = 'block';
            // Remove old ingredients
            const ingredients = document.querySelectorAll('.ingredient');
            ingredients.forEach(element => element.remove());
            // Display new ingredients
            recipe.ingredients.forEach(element => {
                const item = document.createElement("li");
                item.textContent = element;
                item.classList.add('ingredient');
                ingredientListDom.appendChild(item);
                ingredientListDom.style.display = 'block';
            });
        }
        catch (e) {
            console.error(e);
        };
    }
}());