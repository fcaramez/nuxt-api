import express, { Request, Response } from 'express';
import { config } from './config';
import authRouter from './routes/auth';
import userController from './routes/user';
import postRouter from './routes/posts';
import { connect } from './db';
import dotenv from 'dotenv';

const result = dotenv.config();
console.log(result);

const app = express();
config(app);
connect(result.parsed.DATABASE_URL);
app.get('/', async (_req: Request, res: Response) => {
  res.status(200).json({ message: 'Server healthy' });
});

app.use('/auth', authRouter);
app.use('/api', userController);
app.use('/api', postRouter);

export default app;
