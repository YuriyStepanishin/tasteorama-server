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
