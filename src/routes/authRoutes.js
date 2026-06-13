import { celebrate } from 'celebrate';
import { Router } from 'express';
// import {
//   loginUserSchema,
//   registerUserSchema,
//   requestResetEmailSchema,
// } from '../validations/authValidation.js';
import {
  //   registerUser,
  //   loginUser,
  logoutUser,
  //   refreshSession,
  //   requestResetEmail,
} from '../controllers/authController.js';

const router = Router();

// router.post('/auth/register', celebrate(registerUserSchema), registerUser);
// router.post('/auth/login', celebrate(loginUserSchema), loginUser);
router.post('/auth/logout', logoutUser);
// router.post('/auth/refresh', refreshSession);
// router.post(
//   '/auth/request-reset-email',
//   celebrate(requestResetEmailSchema),
//   requestResetEmail,
// );

export default router;
