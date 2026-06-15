import { Router } from 'express';
import { authenticate } from '../middleware/authenticate.js';
import { getCurrentUser } from '../controllers/userController.js';

const router = Router();


// /**
//  * @swagger
//  * tags:
//  *   name: Users
//  *   description: User endpoints
//  */

// /**
//  * @swagger
//  * /me:
//  *   get:
//  *     summary: Get current user
//  *     tags: [Users]
//  *     security:
//  *       - bearerAuth: []
//  *     responses:
//  *       200:
//  *         description: Current user retrieved successfully
//  *       401:
//  *         description: Unauthorized
//  */
router.get('/me', authenticate, getCurrentUser);

export default router;
