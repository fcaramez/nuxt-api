import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { envMap } from '../utils/getEnvVars';

const TOKEN_SECRET = envMap.get('TOKEN_SECRET');

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authorizationHeader = req.headers.authorization;
  console.log('R UN');

  if (authorizationHeader) {
    console.log('TRUE');

    const token = authorizationHeader.replace('Bearer ', '');

    jwt.verify(token, TOKEN_SECRET, async (err, user) => {
      if (err) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized',
        });
      }

      res.locals.user = user;

      next();
    });
  } else {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized',
    });
  }
};
