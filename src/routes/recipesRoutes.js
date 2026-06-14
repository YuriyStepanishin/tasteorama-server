import { Router } from 'express';
import { celebrate } from 'celebrate';

import { authenticate } from '../middleware/authenticate.js';

import {
  getAllRecipesController,
  getRecipeByIdController,
  createRecipeController,
  getFavoritesController,
} from '../controllers/recipesController.js';

import {
  getAllRecipesSchema,
  getRecipeByIdSchema,
  createRecipeSchema,
} from '../validations/recipesValidation.js';

const router = Router();

router.get(
  '/api/recipes',
  celebrate(getAllRecipesSchema),
  getAllRecipesController,
);

router.post(
  '/api/recipes',
  authenticate,
  celebrate(createRecipeSchema),
  createRecipeController,
);

router.get('/api/recipes/favorites/list', authenticate, getFavoritesController);

router.get(
  '/api/recipes/:recipeId',
  celebrate(getRecipeByIdSchema),
  getRecipeByIdController,
);

export default router;
