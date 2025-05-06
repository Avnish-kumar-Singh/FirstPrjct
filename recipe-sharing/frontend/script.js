const backendURL = 'http://localhost:5000';

if (document.getElementById('recipeForm')) {
  document.getElementById('recipeForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const ingredients = document.getElementById('ingredients').value.split(',');
    const instructions = document.getElementById('instructions').value;
    const image = document.getElementById('image').value;

    await fetch(`${backendURL}/recipes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, ingredients, instructions, image })
    });

    alert('Recipe submitted successfully!');
    window.location.href = 'index.html';
  });
}

if (document.getElementById('recipes')) {
  async function fetchRecipes() {
    const res = await fetch(`${backendURL}/recipes`);
    const recipes = await res.json();

    const recipeDiv = document.getElementById('recipes');
    recipes.forEach(recipe => {
      recipeDiv.innerHTML += `
        <div class="recipe-card">
          <h2>${recipe.title}</h2>
          <p><strong>Ingredients:</strong> ${recipe.ingredients.join(', ')}</p>
          <p>${recipe.instructions}</p>
          ${recipe.image ? `<img src="${recipe.image}" width="200">` : ''}
          <hr>
        </div>
      `;
    });
  }
  fetchRecipes();
}
