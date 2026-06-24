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
  deleteRecipeController,
} from '../controllers/recipesController.js';
import {
  getAllRecipesSchema,
  getRecipeByIdSchema,
  createRecipeSchema,
  removeFavoriteSchema,
} from '../validations/recipesValidation.js';

const router = Router();

// /**
//  * @swagger
//  * /api/recipes:
//  *   get:
//  *     summary: Get recipes list
//  *     tags: [Recipes]
//  *     parameters:
//  *       - in: query
//  *         name: page
//  *         schema:
//  *           type: integer
//  *           minimum: 1
//  *       - in: query
//  *         name: perPage
//  *         schema:
//  *           type: integer
//  *           minimum: 1
//  *           maximum: 100
//  *       - in: query
//  *         name: search
//  *         schema:
//  *           type: string
//  *       - in: query
//  *         name: category
//  *         schema:
//  *           type: string
//  *       - in: query
//  *         name: ingredient
//  *         schema:
//  *           type: string
//  *     responses:
//  *      200:
// description: Recipes retrieved successfully
// content:
//   application/json:
//     schema:
//       type: array
//       items:
//         $ref: '#/components/schemas/Recipe'
//  */
router.get(
  '/api/recipes',
  celebrate(getAllRecipesSchema),
  getAllRecipesController,
);

// /**
//  * @swagger
//  * /api/recipes/user:
//  *   get:
//  *     summary: Get current user recipes
//  *     tags: [Recipes]
//  *     security:
//  *       - bearerAuth: []
//  *     responses:
//  *       200:
//  *         description: User recipes retrieved successfully
//  *       401:
//  *         description: Unauthorized
// content:
//   application/json:
//     schema:
//       type: array
//       items:
//         $ref: '#/components/schemas/Recipe'
//  */
router.get('/api/recipes/user', authenticate, getOwnRecipesController);

router.post(
  '/api/add-recipe',
  authenticate,
  celebrate(createRecipeSchema),
  createRecipeController,
);

router.get('/api/recipes/favorites', authenticate, getFavoritesController);

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

// /**
// //  * @swagger
//  * /api/recipes/{recipeId}:
//  *   get:
//  *     summary: Get recipe by id
//  *     tags: [Recipes]
//  *     parameters:
//  *       - in: path
//  *         name: recipeId
//  *         required: true
//  *         schema:
//  *           type: string
//  *     responses:
//  *       200:
//  *         description: Recipe found
//  *       404:
//  *         description: Recipe not found
//  * content:
//   application/json:
//     schema:
//       $ref: '#/components/schemas/Recipe'
//  */

router.delete(
  '/api/recipes/:recipeId',
  authenticate,
  celebrate(getRecipeByIdSchema),
  deleteRecipeController,
);

router.get(
  '/api/recipes/:recipeId',
  celebrate(getRecipeByIdSchema),
  getRecipeByIdController,
);

export default router;
