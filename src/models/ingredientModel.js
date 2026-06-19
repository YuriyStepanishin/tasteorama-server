import { Schema, model } from 'mongoose';

const ingredientSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    desc: {
      type: String,
      required: true,
      trim: true,
    },

    img: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  },
);

export const Ingredient = model('Ingredient', ingredientSchema);
