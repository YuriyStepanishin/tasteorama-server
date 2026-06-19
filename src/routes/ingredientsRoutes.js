import express from 'express';
import { getIngredients } from '../controllers/ingredientsController.js';

const router = express.Router();

// /**
//  * @swagger
//  * tags:
//  *   name: Ingredients
//  *   description: Ingredients endpoints
//  */

// /**
//  * @swagger
//  * /api/ingredients:
//  *   get:
//  *     summary: Get all ingredients
//  *     tags: [Ingredients]
//  *     responses:
//  *       200:
//  *         description: Ingredients retrieved successfully
//  *       500:
//  *         description: Server error
// content:
//   application/json:
//     schema:
//       type: array
//       items:
//         $ref: '#/components/schemas/Ingredient'
//  */
router.get('/api/ingredients', getIngredients);

export default router;
