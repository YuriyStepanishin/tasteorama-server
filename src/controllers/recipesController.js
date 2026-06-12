import Recipe from '../models/recipeModel.js';

export const createRecipeController = async (req, res) => {
  const recipe = await Recipe.create({
    ...req.body,
    owner: req.user._id,
  });

  res.status(201).json({
    data: recipe,
  });
};
