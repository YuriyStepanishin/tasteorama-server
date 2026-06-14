import { Joi, Segments } from 'celebrate';

export const registerUserSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(1).max(16).trim().required(),

    email: Joi.string()
      .email()
      .max(128)
      .trim()
      .required(),

    password: Joi.string()
      .min(8)
      .max(128)
      .required(),
  }),
};

export const loginUserSchema = {
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};
