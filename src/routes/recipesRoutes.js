import { celebrate } from 'celebrate';
import { getAllRecipes } from '../services/recipesService.js';
import { getAllRecipesSchema } from '../validations/recipesValidation.js';
import { Router } from 'express';

const router = Router();

router.get('/api/recipes', celebrate(getAllRecipesSchema), getAllRecipes);

export default router;
