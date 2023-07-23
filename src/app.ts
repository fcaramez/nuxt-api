import express, { Request, Response } from 'express';
import { config } from './config';

const app = express();

config(app);

app.get('/', async (_req: Request, res: Response) => {
  res.status(200).json({ message: 'Server healthy' });
});

export default app;
