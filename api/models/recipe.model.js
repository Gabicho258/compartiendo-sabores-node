import mongoose from "mongoose";

const recipeSchema = {
  user_id: String,
  title: String,
  ingredients: Array,
  procedure: Array,
  images: Array,
  category: String,
  average_rating: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
};

const Recipe = mongoose.model(
  "Recipe",
  new mongoose.Schema(recipeSchema, { timestamps: true }),
  "recipe"
);

export default Recipe;
