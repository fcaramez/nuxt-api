import express, { Request, Response } from 'express';
import { config } from './config';
import authRouter from './routes/auth';

const app = express();

config(app);

app.get('/', async (_req: Request, res: Response) => {
  res.status(200).json({ message: 'Server healthy' });
});

app.use('/auth', authRouter);

export default app;
