import { Ingredient } from '../models/ingredientModel.js';

export const getIngredients = async (req, res) => {
  const ingredients = await Ingredient.find({});

  if (!ingredients || ingredients.length === 0) {
    throw createHttpError(404, 'Ingredients not found');
  }

  res.status(200).json(ingredients);
};
