import { Schema, model } from 'mongoose';

const recipeSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 64,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      maxlength: 200,
      trim: true,
    },

    time: {
      type: String,
      required: true,
    },

    cals: {
      type: Number,
      min: 1,
      max: 10000,
      default: null,
    },

    category: {
      type: String,
      ref: 'Category',
      required: true,
    },

    area: {
      type: String,
      trim: true,
    },

    ingredients: [
      {
        ingredient: {
          type: Schema.Types.ObjectId,
          ref: 'Ingredient',
          required: true,
        },
        ingredientAmount: {
          type: String,
          required: true,
          minlength: 2,
          maxlength: 16,
        },
      },
    ],

    instructions: {
      type: String,
      required: true,
      maxlength: 1200,
      trim: true,
    },

    thumb: {
      type: String,
      default: null,
    },

    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true, versionKey: false },
);

export default model('Recipe', recipeSchema);
