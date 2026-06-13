import { Router } from 'express';
import { celebrate } from 'celebrate';

import { getAllRecipes } from '../controllers/recipesController.js';
import { getAllRecipesSchema } from '../validations/recipesValidation.js';

import { authenticate } from '../middleware/authenticate.js';
import { createRecipeSchema } from '../validations/recipesValidation.js';
import { createRecipeController } from '../controllers/recipesController.js';

const router = Router();

router.get('/api/recipes', celebrate(getAllRecipesSchema), getAllRecipes);

router.post(
  '/api/recipes',
  authenticate,
  celebrate(createRecipeSchema),
  createRecipeController,
);

export default router;
