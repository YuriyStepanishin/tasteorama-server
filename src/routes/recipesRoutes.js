import { getAllRecipes } from '../services/recipesService.js';
import { Router } from 'express';

const router = Router();

router.get('/api/recipes', getAllRecipes);

export default router;
