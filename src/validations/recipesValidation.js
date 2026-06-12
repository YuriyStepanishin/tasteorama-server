import Joi from 'joi';

const getAllRecipesSchema = Joi.object({
  page: Joi.number().integer().min(1),
  perPage: Joi.number().integer().min(1).max(100),
  search: Joi.string().max(64),
  category: Joi.string().hex().length(24),
  ingredient: Joi.string().hex().length(24),
});
