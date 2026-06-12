import { Schema } from 'mongoose';

const ingredientSchema = new Schema({
  name: String,
});

export const Ingredient = model('ingredients', ingredientSchema);
