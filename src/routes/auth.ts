import express from 'express';
import {
  loginController,
  recoverPassword,
  signupController,
} from '../controllers';
import { isAuthenticated } from '../middlewares';

const authRouter = express.Router();

authRouter.post('/signup', signupController);
authRouter.post('/login', loginController);
authRouter.post('/recover', isAuthenticated, recoverPassword);

export default authRouter;
