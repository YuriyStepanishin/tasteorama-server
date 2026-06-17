// /**
//  * @swagger
//  * tags:
//  *   name: Recipes
//  *   description: Recipes endpoints
//  */

import { Router } from 'express';
import { celebrate } from 'celebrate';
import { authenticate } from '../middleware/authenticate.js';
import {
  getAllRecipesController,
  getOwnRecipesController,
  getRecipeByIdController,
  createRecipeController,
  getFavoritesController,
  removeFavoriteController,
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

// /**
//  * @swagger
//  * /api/recipes:
//  *   post:
//  *     summary: Create new recipe
//  *     tags: [Recipes]
//  *     security:
//  *       - bearerAuth: []
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             $ref: '#/components/schemas/CreateRecipeRequest'
//  *     responses:
//  *       201:
//  *         description: Recipe created successfully
//  *       400:
//  *         description: Validation error
//  *       401:
//  *         description: Unauthorized
//  */
router.post(
  '/api/recipes',
  authenticate,
  celebrate(createRecipeSchema),
  createRecipeController,
);

// /**
//  * @swagger
//  * /api/recipes/favorites/list:
//  *   get:
//  *     summary: Get favorite recipes
//  *     tags: [Recipes]
//  *     security:
//  *       - bearerAuth: []
//  *     responses:
//  *       200:
//  *         description: Favorite recipes retrieved successfully
//  *       401:
//  *         description: Unauthorized
//  */
router.get('/api/recipes/favorites/list', authenticate, getFavoritesController);

// /**
//  * @swagger
//  * /api/recipes/favorites/{recipeId}:
//  *   delete:
//  *     summary: Remove recipe from favorites
//  *     tags: [Recipes]
//  *     security:
//  *       - bearerAuth: []
//  *     parameters:
//  *       - in: path
//  *         name: recipeId
//  *         required: true
//  *         schema:
//  *           type: string
//  *     responses:
//  *       200:
//  *         description: Recipe removed from favorites
//  *       401:
//  *         description: Unauthorized
//  *       404:
//  *         description: Recipe not found
//  */
router.delete(
  '/api/recipes/favorites/:recipeId',
  authenticate,
  celebrate(removeFavoriteSchema),
  removeFavoriteController,
);

/**
 * @swagger
 * /api/recipes/{recipeId}:
 *   get:
 *     summary: Get recipe by id
 *     tags: [Recipes]
 *     parameters:
 *       - in: path
 *         name: recipeId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Recipe found
 *       404:
 *         description: Recipe not found
 * content:
  application/json:
    schema:
      $ref: '#/components/schemas/Recipe'
 */
router.get(
  '/api/recipes/:recipeId',
  celebrate(getRecipeByIdSchema),
  getRecipeByIdController,
);

export default router;
