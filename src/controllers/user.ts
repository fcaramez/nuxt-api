import { Request, Response } from 'express';
import { UpdateUserRequest } from 'requests';
import { User } from '../models/User.model';
import { Post } from '../models/Post.model';

export const getUserController = async (_req: Request, res: Response) => {
  try {
    const { userId } = res.locals.user;

    const user = await User.findById(userId).populate('posts');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    delete user.password;

    return res.status(200).json({
      success: true,
      data: { user },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

export const updateUser = async (req: UpdateUserRequest, res: Response) => {
  try {
    const { userId } = res.locals.user;

    await User.findByIdAndUpdate(userId, {
      ...req.body,
    });

    return res.status(200).json({
      message: 'User updated successfully',
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

export const getUserPosts = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const posts = await Post.find({
      author: userId,
    })
      .populate('author comments')
      .populate({
        path: 'comments',
        populate: {
          path: 'author',
          model: 'User',
        },
      });

    if (!posts) {
      return res.status(200).json({
        message: 'This user does not have any posts yet',
        success: true,
      });
    }

    return res.status(200).json({
      message: "Users' posts retrieved successfully",
      success: true,
      data: posts,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Internal server error',
      success: false,
    });
  }
};
