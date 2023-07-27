import { Request, Response } from 'express';
import { AddPostRequest } from 'requests';
import { Post } from '../models/Post.model';
import { User } from '../models/User.model';

export const addPost = async (req: AddPostRequest, res: Response) => {
  try {
    const { content, attachments } = req.body;
    const { userId } = res.locals.user;

    const post = await Post.create({
      author: userId,
      content,
      attachments,
    });

    User.findByIdAndUpdate(userId, {
      $push: {
        posts: post._id,
      },
    });

    return res.status(201).json({
      message: 'Post added',
      success: true,
      data: { post },
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Internal server error',
      success: false,
    });
  }
};
