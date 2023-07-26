import { Request } from 'express';

export interface SignupRequest extends Request {
  body: {
    username: string;
    password: string;
    email: string;
    avatar?: string;
  };
}

export interface LoginRequest extends Request {
  body: {
    username?: string;
    email?: string;
    password: string;
  };
}

export interface UpdateUserRequest extends Request {
  body: {
    username: string;
    email: string;
    password: string;
    avatar: string;
    backgroundImage: string;
  };
}

export interface AddPostRequest extends Request {
  body: {
    content: string;
    attachments?: string[];
  };
}
