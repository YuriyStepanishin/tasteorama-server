import Recipe from '../models/recipeModel.js';
import { Ingredient } from '../models/ingredientModel.js';
import { parsePaginationParams, parseSortOrder } from '../utils/helpers.js';

export const getAllRecipesController = async (req, res, next) => {
  try {
    const {
      page = 1,
      perPage = 12,
      search,
      category,
      ingredient,
      sortBy = '_id',
      sortOrder = 'asc',
    } = req.query;

    const { page: safePage, perPage: safePerPage } = parsePaginationParams({
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
        recipesQuery
          .where('ingredients.ingredient')
          .equals(foundIngredient._id);
      } else {
        return res.status(200).json({
          status: 200,
          message: 'Recipes fetched successfully',
          data: {
            page: safePage,
            perPage: safePerPage,
            totalItems: 0,
            totalPages: 0,
            recipes: [],
          },
        });
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

    res.status(200).json({
      status: 200,
      message: 'Recipes fetched successfully',
      data: {
        page: safePage,
        perPage: safePerPage,
        totalItems,
        totalPages: Math.ceil(totalItems / safePerPage),
        recipes,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getOwnRecipesController = async (req, res, next) => {
  try {
    const {
      page = 1,
      perPage = 12,
      search,
      category,
      ingredient,
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = req.query;

    const { page: safePage, perPage: safePerPage } = parsePaginationParams({
      page,
      perPage,
    });

    const skip = (safePage - 1) * safePerPage;

    const mongoSortOrder = parseSortOrder(sortOrder);

    const recipesQuery = Recipe.find({
      owner: req.user._id,
    }).sort({
      [sortBy]: mongoSortOrder,
    });

    if (search) {
      recipesQuery.where('name', {
        $regex: search,
        $options: 'i',
      });
    }

    if (category) {
      recipesQuery.where('category').equals(category);
    }

    if (ingredient) {
      const foundIngredient = await Ingredient.findOne({
        name: ingredient,
      });

      if (foundIngredient) {
        recipesQuery
          .where('ingredients.ingredient')
          .equals(foundIngredient._id);
      } else {
        return res.status(200).json({
          status: 200,
          message: 'Own recipes fetched successfully',
          data: {
            page: safePage,
            perPage: safePerPage,
            totalItems: 0,
            totalRecipes: 0,
            totalPages: 0,
            recipes: [],
          },
        });
      }
    }

    const [totalItems, recipes] = await Promise.all([
      recipesQuery.clone().countDocuments(),
      recipesQuery.skip(skip).limit(safePerPage),
    ]);

    res.status(200).json({
      status: 200,
      message: 'Own recipes fetched successfully',
      data: {
        page: safePage,
        perPage: safePerPage,
        totalItems,
        totalRecipes: totalItems,
        totalPages: Math.ceil(totalItems / safePerPage),
        recipes,
      },
    });
  } catch (error) {
    next(error);
  }
};
