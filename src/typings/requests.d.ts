import { Request } from 'express';

export interface SignupBody extends Request {
  body: {
    username: string;
    password: string;
    email: string;
    avatar?: string;
  };
}

export interface LoginBody extends Request {
  body: {
    username?: string;
    email?: string;
    password: string;
  };
}
