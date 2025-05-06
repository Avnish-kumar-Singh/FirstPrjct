const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected'))
.catch((err) => console.error(err));

// Recipe Schema
const recipeSchema = new mongoose.Schema({
  title: String,
  ingredients: [String],
  instructions: String,
  image: String,
});

const Recipe = mongoose.model('Recipe', recipeSchema);

// Routes
app.get('/', (req, res) => {
  res.send('Recipe Sharing Platform Backend Running');
});

// Create Recipe
app.post('/recipes', async (req, res) => {
  const { title, ingredients, instructions, image } = req.body;
  const newRecipe = new Recipe({ title, ingredients, instructions, image });
  await newRecipe.save();
  res.json(newRecipe);
});

// Get All Recipes
app.get('/recipes', async (req, res) => {
  const recipes = await Recipe.find();
  res.json(recipes);
});

// Get Single Recipe
app.get('/recipes/:id', async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);
  res.json(recipe);
});

// Delete Recipe
app.delete('/recipes/:id', async (req, res) => {
  await Recipe.findByIdAndDelete(req.params.id);
  res.json({ message: 'Recipe Deleted' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
