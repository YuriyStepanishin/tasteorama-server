//routes/authRoutes.js

import { authenticate } from "../middleware/authenticate.js";
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
   getMe,
} from '../controllers/authController.js';

const router = Router();


 /**
  * @swagger
  * tags:
  *   name: Auth
  *   description: Authentication endpoints
  */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterRequest'
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation error
 */

router.post('/register', celebrate(registerUserSchema), registerUser);

/**
  * @swagger
  * /auth/login:
  *   post:
  *     summary: Login user
  *     tags: [Auth]
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             $ref: '#/components/schemas/LoginRequest'
  *     responses:
  *       200:
  *         description: Login successful
  *       401:
  *         description: Invalid credentials
  */
router.post('/login', celebrate(loginUserSchema), loginUser);


 /**
  * @swagger
  * /auth/logout:
  *   post:
  *     summary: Logout user
  *     tags: [Auth]
  *     responses:
  *       204:
  *         description: Logout successful
  */
router.post('/logout', authenticate, logoutUser);
 /**
  * @swagger
  * /auth/refresh:
  *   post:
  *     summary: Refresh user session
  *     tags: [Auth]
  *     responses:
  *       200:
  *         description: Session refreshed
  */
router.post('/refresh', refreshSession);

router.get("/me", authenticate, getMe);

export default router;
