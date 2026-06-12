import { Schema, model } from 'mongoose';

const ingredientSchema = new Schema({
  name: { type: String },
});

export const Ingredient = model('ingredients', ingredientSchema);
