import { getAllRecipes, getOwnRecipes } from '../services/recipesService.js';

export const getAllRecipesController = async (req, res, next) => {
  try {
    const result = await getAllRecipes(req.query);

    res.status(200).json({
      status: 200,
      message: 'Recipes fetched successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const getOwnRecipesController = async (req, res, next) => {
  try {
    const result = await getOwnRecipes({
      owner: req.user._id,
      ...req.query,
    });

    res.status(200).json({
      status: 200,
      message: 'Own recipes fetched successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
