import { Joi, Segments } from 'celebrate';

export const registerUserSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(2).max(16).trim().required(),
    email: Joi.string().email().required().trim(),
    password: Joi.string().required(),
  }),
};

export const loginUserSchema = {
  [Segments.BODY]: Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
};
