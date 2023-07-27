import { Request } from 'express';

// Auth
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

export interface ResetPasswordRequest extends Request {
  body: {
    password: string;
    oldPassword: string;
  };
}

// Posts
export interface AddPostRequest extends Request {
  body: {
    content: string;
    attachments?: string[];
  };
}
