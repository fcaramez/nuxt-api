import express from 'express';
import { getUserController } from '../controllers';

const userController = express.Router();

userController.get('/user/:userId', getUserController);

export default userController;
