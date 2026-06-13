import {
  getAllRecipesController,
  getOwnRecipesController,
} from '../controllers/recipesController.js';
import { Router } from 'express';
import { authenticate } from '../middleware/authenticate.js';

const router = Router();

router.get('/api/recipes', getAllRecipesController);
router.get('/api/recipes/user', authenticate, getOwnRecipesController);

export default router;
