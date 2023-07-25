import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';

export const getUserController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

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

export const updateUser = async (req: Request, res: Response) => {};
