import { isAuthenticated } from '../middlewares';
import { addPost } from '../controllers';
import express from 'express';

const postRouter = express.Router();

postRouter.post('/post/new', isAuthenticated, addPost);

export default postRouter;
