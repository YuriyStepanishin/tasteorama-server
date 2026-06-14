 import { celebrate } from 'celebrate';
 import { Router } from 'express';
 import {
   loginUserSchema,
   registerUserSchema,
   //requestResetEmailSchema,
} from '../validations/authValidation.js';
import {
   registerUser,
   loginUser,
   logoutUser,
} from '../controllers/authController.js';

 const router = Router();

router.post("/register", celebrate(registerUserSchema), registerUser);
router.post("/login", celebrate(loginUserSchema), loginUser);
router.post("/logout", logoutUser);
 //router.post(
  // '/auth/request-reset-email',
  // celebrate(requestResetEmailSchema),
   //requestResetEmail,
 //);

export default router;
