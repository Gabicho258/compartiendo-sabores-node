import express from "express";

import { RecipeController } from "../controllers/index.js";
import { isAuthenticated } from "../middlewares/index.js";

const {
  createRecipe,
  getAllRecipes,
  updateRecipe,
  deleteRecipe,
  getOneRecipe,
} = RecipeController;

const router = express.Router();

const RECIPE_ROUTES = {
  GET_ALL: "/recipe",
  GET_ONE: "/recipe/:id",
  CREATE: "/recipe/create",
  UPDATE: "/recipe/update/:id",
  DELETE: "/recipe/delete/:id",
};

router.get(RECIPE_ROUTES.GET_ALL, getAllRecipes);
router.get(RECIPE_ROUTES.GET_ONE, getOneRecipe);
router.put(RECIPE_ROUTES.UPDATE, updateRecipe);
router.post(RECIPE_ROUTES.CREATE, isAuthenticated, createRecipe);
router.delete(RECIPE_ROUTES.DELETE, deleteRecipe);

export default router;
