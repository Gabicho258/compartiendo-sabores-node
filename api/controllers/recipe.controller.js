import { Recipe } from "../models/index.js";

export const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const createRecipe = async (req, res) => {
  const newRecipe = new Recipe({ ...req.body });
  try {
    const recipe = await newRecipe.save();
    recipe && res.status(201).json(recipe);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const updateRecipe = async (req, res) => {
  const { id: recipe_id } = req.params;
  const recipeToUpdate = req.body;

  try {
    const recipeUpdated = await Recipe.findByIdAndUpdate(
      recipe_id,
      recipeToUpdate,
      { new: true }
    );
    if (recipeUpdated) {
      res.status(200).json(recipeUpdated);
    } else {
      res.status(204).json({ error: "Recipe not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const deleteRecipe = async (req, res) => {
  const { id: recipe_id } = req.params;
  const recipeToDelete = req.body;

  try {
    const recipeDeleted = await Recipe.findByIdAndDelete(recipe_id);
    if (recipeDeleted) {
      res.status(200).json(recipeDeleted);
    } else {
      res.status(204).json({ error: "Recipe not found" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const getOneRecipe = async (req, res) => {
  const { id: recipe_id } = req.params;

  try {
    const recipe = await Recipe.findById(recipe_id);
    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ error });
  }
};
