import express from 'express';
import { getUserController } from '../controllers';
import { isAuthenticated } from '../middlewares';

const userController = express.Router();

userController.get('/user', isAuthenticated, getUserController);

export default userController;
