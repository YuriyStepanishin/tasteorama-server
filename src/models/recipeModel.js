import { Schema, model } from 'mongoose';

const recipeSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 64,
      trim: true,
    },

    decr: {
      type: String,
      required: true,
      maxlength: 200,
      trim: true,
    },

    cookiesTime: {
      type: Number,
      required: true,
      min: 1,
      max: 360,
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

    instruction: {
      type: String,
      required: true,
      maxlength: 1200,
      trim: true,
    },

    recipeImg: {
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
