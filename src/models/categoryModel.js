import { Schema, model } from 'mongoose';

const categorySchema = new Schema({
  name: { type: String },
});

export const Category = model('categories', categorySchema);
