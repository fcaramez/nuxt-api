import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { UpdateUserRequest } from 'requests';
import * as bcrypt from 'bcrypt';

export const getUserController = async (_req: Request, res: Response) => {
  try {
    const { userId } = res.locals.user;

    const user = await prisma.user.findUnique({
      where: {
        userId,
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    delete user.password;

    return res.status(200).json({
      success: true,
      data: { ...user },
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

    await prisma.user.update({
      where: {
        userId,
      },
      data: {
        ...req.body,
      },
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
