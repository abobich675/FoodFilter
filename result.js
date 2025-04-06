function parseDataField(field) {
    if (typeof field === 'string') {
        try {
            const parsedField = JSON.parse(field); // Parse the string into an object
            return parsedField.ingredients || parsedField.steps || parsedField.nutrition || []; // Extract the array
        } catch (err) {
            console.error(`Unable to parse field:`, field);
            return []; // Fallback to an empty array
        }
    }
    return field || []; // If it's already an array, return it
}

window.addEventListener('DOMContentLoaded', () => {
    const dataString = localStorage.getItem('result'); 
    if (!dataString) return;

    const data = JSON.parse(dataString);
    console.log('Data from localStorage:', data);

    // display image 
    if (data.imageUrl) {
        const recipeImage = document.getElementById('recipe-image');
        recipeImage.src = data.imageUrl;
        document.getElementById('dish-image').style.display = 'block';
    } else {
        document.getElementById('dish-image').style.display = 'none';
    }
    
    //parse the jsonString property if it exists
    const recipeData = data.jsonString ? JSON.parse(data.jsonString) : data;
    console.log('Recipe data:', recipeData);
    
    const ingredients = recipeData.ingredients || [];
    const steps = recipeData.steps || [];
    const nutrition = recipeData.nutrition || [];


    const ingredientsElem = document.querySelector('#ingredients ul');
    const stepsElem = document.querySelector('#steps ol');
    const nutritionElem = document.querySelector('#nutrients ul');

    //populate ingredients
    for (let i = 0; i < ingredients.length; i++) {
        const li = document.createElement('li');
        li.textContent = ingredients[i];
        ingredientsElem.appendChild(li);
    }

    //populate steps
    for (let i = 0; i < steps.length; i++) {
        const li = document.createElement('li');
        li.textContent = steps[i];
        stepsElem.appendChild(li);
    }

    //populate nutrition
    for (let i = 0; i < nutrition.length; i++) {
        const li = document.createElement('li');
        li.textContent = nutrition[i];
        nutritionElem.appendChild(li);
    }
});