import { Router } from 'express';
import { celebrate } from 'celebrate';
import { authenticate } from '../middleware/authenticate.js';
import {
  getAllRecipesController,
  getOwnRecipesController,
  getRecipeByIdController,
  createRecipeController,
  getFavoritesController,
  addFavoriteController,
  removeFavoriteController,
} from '../controllers/recipesController.js';
import {
  getAllRecipesSchema,
  getRecipeByIdSchema,
  createRecipeSchema,
  removeFavoriteSchema,
} from '../validations/recipesValidation.js';

const router = Router();

router.get(
  '/api/recipes',
  celebrate(getAllRecipesSchema),
  getAllRecipesController,
);

router.get('/api/recipes/user', authenticate, getOwnRecipesController);

router.post(
  '/api/recipes',
  authenticate,
  celebrate(createRecipeSchema),
  createRecipeController,
);

router.get('/api/recipes/favorites/list', authenticate, getFavoritesController);

router.post(
  '/api/recipes/favorites/:recipeId',
  authenticate,
  celebrate(removeFavoriteSchema),
  addFavoriteController,
);

router.delete(
  '/api/recipes/favorites/:recipeId',
  authenticate,
  celebrate(removeFavoriteSchema),
  removeFavoriteController,
);

router.get(
  '/api/recipes/:recipeId',
  celebrate(getRecipeByIdSchema),
  getRecipeByIdController,
);

export default router;