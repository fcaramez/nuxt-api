import { Request, Response } from 'express';
import { AddPostRequest } from 'requests';
import { prisma } from '../lib/prisma';

export const addPost = async (req: AddPostRequest, res: Response) => {
  try {
    const { content, attachments } = req.body;
    const { userId } = res.locals.user;

    const post = await prisma.post.create({
      data: {
        content,
        attatchments: attachments ? attachments : [''],
        userId,
        likeCount: 0,
      },
    });

    return res.status(201).json({
      message: 'Post added',
      success: true,
      data: { ...post },
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Internal server error',
      success: false,
    });
  }
};
