import express from 'express';
import { getUserController, getUserPosts } from '../controllers';
import { isAuthenticated } from '../middlewares';

const userController = express.Router();

userController.get('/user', isAuthenticated, getUserController);
userController.get('/:userId/posts', getUserPosts);

export default userController;
