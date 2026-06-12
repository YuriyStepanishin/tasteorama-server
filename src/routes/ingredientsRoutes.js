import express from 'express';
import { getIngredients } from '../controllers/ingredientsController.js';

const router = express.Router();

router.get('/api/ingredients', getIngredients);

export default router;
