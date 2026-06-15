import createHttpError from 'http-errors';
import Recipe from '../models/recipeModel.js';
import { User } from '../models/userModel.js';
import { Ingredient } from '../models/ingredientModel.js';

export const getAllRecipesController = async (req, res) => {
  const { page = 1, perPage = 12, search, category, ingredient } = req.query;
  const skip = (page - 1) * perPage;

  const recipesQuery = Recipe.find().sort({ createdAt: -1 });

  if (category) {
    recipesQuery.where('category').equals(category);
  }
  if (ingredient) {
    recipesQuery.where('ingredients.id').equals(ingredient);
  }
  if (search) {
    recipesQuery.where('name', { $regex: search, $options: 'i' });
  }

  const [totalRecipes, recipes] = await Promise.all([
    recipesQuery.clone().countDocuments(),
    recipesQuery.skip(Number(skip)).limit(Number(perPage)),
  ]);

  const totalPages = Math.ceil(totalRecipes / perPage);

  res.status(200).json({ page, perPage, totalRecipes, totalPages, recipes });
};

export const getRecipeByIdController = async (req, res) => {
  const { recipeId } = req.params;

  const recipe = await Recipe.findById(recipeId).populate({
    path: 'ingredients.ingredient',
    select: 'name',
  });

  if (!recipe) {
    throw createHttpError(404, 'Recipe not found');
  }

  res.status(200).json({ data: recipe });
};

export const createRecipeController = async (req, res) => {
  const recipe = await Recipe.create({
    ...req.body,
    owner: req.user._id,
  });

  res.status(201).json({
    data: recipe,
  });
};

export const getFavoritesController = async (req, res) => {
  const user = await User.findById(req.user._id).populate('favorites');
  res.status(200).json({ recipes: user.favorites });
};

export const getOwnRecipesController = async (req, res) => {
  const { page = 1, perPage = 12, search, category, ingredient } = req.query;
  const skip = (page - 1) * perPage;

  const recipesQuery = Recipe.find({ owner: req.user._id }).sort({
    createdAt: -1,
  });

  if (category) {
    recipesQuery.where('category').equals(category);
  }
  if (ingredient) {
    const foundIngredient = await Ingredient.findOne({
      name: ingredient,
    });

    if (!foundIngredient) {
      return res
        .status(200)
        .json({ page, perPage, totalRecipes: 0, totalPages: 0, recipes: [] });
    } else {
      recipesQuery.where('ingredients.ingredient').equals(foundIngredient._id);
    }
  }
  if (search) {
    recipesQuery.where('name', { $regex: search, $options: 'i' });
  }

  const [totalRecipes, recipes] = await Promise.all([
    recipesQuery.clone().countDocuments(),
    recipesQuery.skip(Number(skip)).limit(Number(perPage)),
  ]);

  const totalPages = Math.ceil(totalRecipes / perPage);

  res.status(200).json({ page, perPage, totalRecipes, totalPages, recipes });
};

export const removeFavoriteController = async (req, res) => {
  const { recipeId } = req.params;

  const user = await User.findById(req.user._id);

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  const isFavorite = user.favorites.some((id) => id.toString() === recipeId);

  if (!isFavorite) {
    throw createHttpError(404, 'Recipe not found in favorites');
  }

  user.favorites = user.favorites.filter((id) => id.toString() !== recipeId);

  await user.save();

  res.status(200).json({
    message: 'Recipe removed from favorites',
  });
};
