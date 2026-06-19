import { Category } from '../models/categoryModel.js';

export const getCategories = async (req, res) => {
  const categories = await Category.find({});

  if (!categories || categories.length === 0) {
    throw createHttpError(404, 'Categories not found');
  }

  res.status(200).json(categories);
};
