import { celebrate } from 'celebrate';
import { Router } from 'express';
import {
  loginUserSchema,
  registerUserSchema,
} from '../validations/authValidation.js';
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshSession,
} from '../controllers/authController.js';

const router = Router();


// /**
//  * @swagger
//  * tags:
//  *   name: Auth
//  *   description: Authentication endpoints
//  */

// /**
// //  * @swagger
// //  * /auth/register:
// //  *   post:
// //  *     summary: Register a new user
// //  *     tags: [Auth]
// //  *     requestBody:
// //  *       required: true
// //  *       content:
// //  *         application/json:
// //  *           schema:
// //  *             $ref: '#/components/schemas/RegisterRequest'
// //  *     responses:
// //  *       201:
// //  *         description: User registered successfully
// //  *       400:
// //  *         description: Validation error
// //  */
router.post('/auth/register', celebrate(registerUserSchema), registerUser);

// /**
//  * @swagger
//  * /auth/login:
//  *   post:
//  *     summary: Login user
//  *     tags: [Auth]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             $ref: '#/components/schemas/LoginRequest'
//  *     responses:
//  *       200:
//  *         description: Login successful
//  *       401:
//  *         description: Invalid credentials
//  */
router.post('/auth/login', celebrate(loginUserSchema), loginUser);


// /**
//  * @swagger
//  * /auth/logout:
//  *   post:
//  *     summary: Logout user
//  *     tags: [Auth]
//  *     responses:
//  *       204:
//  *         description: Logout successful
//  */
router.post('/auth/logout', logoutUser);

// /**
//  * @swagger
//  * /auth/refresh:
//  *   post:
//  *     summary: Refresh user session
//  *     tags: [Auth]
//  *     responses:
//  *       200:
//  *         description: Session refreshed
//  */
router.post('/auth/refresh', refreshSession);

export default router;
