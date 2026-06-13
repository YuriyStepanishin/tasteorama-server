import Recipe from '../models/recipeModel.js';
import { Ingredient } from '../models/ingredientModel.js';
import { parsePaginationParams, parseSortOrder } from '../utils/helpers.js';

export const getAllRecipes = async ({
 page = 1,
  perPage = 12,
  search,
  category,
  ingredient,
  sortBy = '_id',
  sortOrder = 'asc',
}) => {
  const {
    page: safePage,
    perPage: safePerPage,
  } = parsePaginationParams({
    page,
    perPage,
  });

  const skip = (safePage - 1) * safePerPage;
  const mongoSortOrder = parseSortOrder(sortOrder);

  const recipesQuery = Recipe.find().sort({
    [sortBy]: mongoSortOrder,
  });

  if (category) {
    recipesQuery.where('category').equals(category);
  }

  if (ingredient) {
    const foundIngredient = await Ingredient.findOne({
      name: ingredient,
    });

    if (foundIngredient) {
      recipesQuery.where('ingredients.ingredient').equals(foundIngredient._id);
    } else {
      return {
        page,
        perPage,
        totalItems: 0,
        totalPages: 0,
        recipes: [],
      };
    }
  }

  if (search) {
    recipesQuery.where('name', {
      $regex: search,
      $options: 'i',
    });
  }

  const [totalItems, recipes] = await Promise.all([
    recipesQuery.clone().countDocuments(),
    recipesQuery.skip(skip).limit(safePerPage),
  ]);

  return {
    page: safePage,
    perPage: safePerPage,
    totalItems,
    totalPages: Math.ceil(totalItems / safePerPage),
    recipes,
  };
};

export const getOwnRecipes = async ( {
 owner,
  page = 1,
  perPage = 12,
  search,
  category,
  ingredient,
  sortBy = 'createdAt',
  sortOrder = 'desc',
}) => {
  const {
    page: safePage,
    perPage: safePerPage,
  } = parsePaginationParams({
    page,
    perPage,
  });
  const skip = (safePage - 1) * safePerPage;
  const mongoSortOrder = parseSortOrder(sortOrder);

  const ownRecipesQuery = Recipe.find({ owner }).sort({
    [sortBy]: mongoSortOrder,
  });

  if (search) {
    ownRecipesQuery.where('name', { $regex: search, $options: 'i' });
  }
  if (category) {
    ownRecipesQuery.where('category').equals(category);
  }
  if (ingredient) {
    const foundIngredient = await Ingredient.findOne({ name: ingredient });
    if (foundIngredient) {
      ownRecipesQuery
        .where('ingredients.ingredient')
        .equals(foundIngredient._id);
    } else {
      return {
        page: safePage,
        perPage: safePerPage,
        totalItems: 0,
        totalRecipes: 0,
        totalPages: 0,
        recipes: [],
      };
    }
  }

  const [totalItems, recipes] = await Promise.all([
    ownRecipesQuery.clone().countDocuments(),
    ownRecipesQuery.skip(skip).limit(safePerPage),
  ]);

  const totalPages = Math.ceil(totalItems / safePerPage);

  return {
    page: safePage,
    perPage: safePerPage,
    totalItems,
    totalRecipes: totalItems,
    totalPages,
    recipes,
  };
};
