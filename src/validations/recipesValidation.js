import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';
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
    title: Joi.string().max(64).required(),
    description: Joi.string().max(200).required(),
    time: Joi.string().required(),
    cals: Joi.number().integer().min(1).max(10000),
    category: Joi.string().required(),
    ingredients: Joi.array()
      .items(
        Joi.object({
          ingredient: Joi.string().required(),
          ingredientAmount: Joi.string().min(1).max(16).required(),
        }),
      )
      .min(1)
      .required(),
    instructions: Joi.string().max(1200).required(),
  }),
};

export const removeFavoriteSchema = {
  [Segments.PARAMS]: Joi.object({
    recipeId: Joi.string()
      .custom((value, helpers) => {
        if (!isValidObjectId(value)) {
          return helpers.error('any.invalid');
        }

        return value;
      })
      .required(),
  }),
};
