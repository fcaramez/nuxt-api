import cors from 'cors';
import logger from 'morgan';
import express from 'express';
import { Application } from 'express';

export const config = (app: Application) => {
  app.set('port', process.env.PORT || 5005);
  app.set('trust proxy', true);
  app.use(
    cors({
      credentials: true,
      origin: process.env.ORIGIN || 'http://localhost:3000',
    }),
  );
  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
};
