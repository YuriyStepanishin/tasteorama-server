import { Ingredient } from '../models/ingredientModel.js';

export const getIngredients = async (req, res) => {
  const ingredients = await Ingredient.find();

  res.json(ingredients);
};
