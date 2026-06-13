import { Joi, Segments } from 'celebrate';
import { CATEGORIES } from '../constants/categories.js';

export const getAllRecipesSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1),
    perPage: Joi.number().integer().min(1).max(100),
    search: Joi.string().max(64).trim().allow(''),
    category: Joi.string().valid(...CATEGORIES),
    ingredient: Joi.string().hex().length(24),
  }),
};

export const getRecipeByIdSchema = {
  [Segments.PARAMS]: Joi.object({
    recipeId: Joi.string().hex().length(24).required(),
  }),
};

export const createRecipeSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().max(64).required(),
    decr: Joi.string().max(200).required(),
    cookiesTime: Joi.number().integer().min(1).max(360).required(),
    cals: Joi.number().integer().min(1).max(10000),
    category: Joi.string().required(),
    ingredients: Joi.array()
      .items(
        Joi.object({
          ingredient: Joi.string().required(),

          ingredientAmount: Joi.string().min(2).max(16).required(),
        }),
      )
      .min(1)
      .required(),
    instruction: Joi.string().max(1200).required(),
  }),
};
