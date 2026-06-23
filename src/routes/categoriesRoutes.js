import express from 'express';

import { getCategories } from '../controllers/categoriesController.js';

const router = express.Router();

// /**
//  * @swagger
//  * tags:
//  *   name: Categories
//  *   description: Categories endpoints
//  */

// /**
//  * @swagger
//  * /api/categories:
//  *   get:
//  *     summary: Get all recipe categories
//  *     tags: [Categories]
//  *     responses:
//  *       200:
//  *         description: Categories retrieved successfully
//  *       500:
//  *         description: Server error
// content:
//   application/json:
//     schema:
//       type: array
//       items:
//         $ref: '#/components/schemas/Category'
//  */
router.get('/api/categories', getCategories);

export default router;
