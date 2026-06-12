import Recipe from '../models/recipeModel.js';

export const getAllRecipes = async (req, res) => {
  const { page = 1, perPage = 15, search, category, ingredient } = req.query;
  const skip = (page - 1) * perPage;

  const recipesQuery = Recipe.find().sort({ createdAt: -1 });

  if (category) {
    recipesQuery.where('category').equals(category);
  }
  if (ingredient) {
    recipesQuery.where('ingredients.ingredient').equals(ingredient);
  }
  if (search) {
    recipesQuery.where('name', { $regex: search, $options: 'i' });
  }

  const [totalRecipes, recipes] = await Promise.all([
    recipesQuery.clone().countDocuments(),
    recipesQuery.skip(Number(skip)).limit(Number(perPage)),
  ]);

  const totalPages = Math.ceil(totalRecipes / perPage);

  res.status(200).json({ page, perPage, totalRecipes, totalPages, recipes });
};
