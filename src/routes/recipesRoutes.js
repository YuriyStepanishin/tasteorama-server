import { Router } from 'express';
import { celebrate } from 'celebrate';

import { authenticate } from '../middleware/authenticate.js';

import {
  getAllRecipesController,
  createRecipeController,
  getFavoritesController,
} from '../controllers/recipesController.js';

import {
  getAllRecipesSchema,
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

export default router;
