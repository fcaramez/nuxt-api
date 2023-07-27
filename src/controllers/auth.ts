import { Request, Response } from 'express';
import { LoginRequest, ResetPasswordRequest, SignupRequest } from 'requests';
import { prisma } from '../lib/prisma';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { envMap } from '../utils/getEnvVars';

const TOKEN_SECRET = envMap.get('TOKEN_SECRET');

export const signupController = async (req: SignupRequest, res: Response) => {
  try {
    const { username, email, password, avatar } = req.body;

    if (!username || !email || !password) {
      return res.status(404).json({
        success: false,
        message: 'Please fill all mandatory fields',
      });
    }

    const userToFind = await prisma.user.findFirst({
      where: {
        OR: [{ email: email }, { username: username }],
      },
    });

    if (userToFind) {
      return res.status(403).json({
        success: false,
        message: 'User already exists',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        username,
        avatar: avatar
          ? avatar
          : `https://ui-avatars.com/api/?name=${username}`,
        backgroundImage: '',
      },
    });

    const payload = {
      userId: newUser.userId,
      username,
      email,
      avatar: newUser.avatar,
    };

    const authToken = jwt.sign(payload, TOKEN_SECRET);

    return res.status(201).json({
      success: true,
      message: `Welcome aboard, ${username}!`,
      data: {
        ...payload,
        token: authToken,
      },
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

export const loginController = async (req: LoginRequest, res: Response) => {
  try {
    const { username, email, password } = req.body;

    if ((!username && !email) || !password) {
      return res.status(404).json({
        success: false,
        message: 'Fields are mandatory',
      });
    }

    const userToFind = await prisma.user.findFirst({
      where: {
        OR: [
          {
            email: email,
          },
          {
            username: username,
          },
        ],
      },
    });

    if (!userToFind) {
      return res.status(403).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    const comparePassword = await bcrypt.compare(password, userToFind.password);

    if (!comparePassword) {
      return res.status(403).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    const payload = {
      userId: userToFind.userId,
      username: userToFind.username,
      email: userToFind.email,
      avatar: userToFind.avatar,
    };

    const authToken = jwt.sign(payload, TOKEN_SECRET);

    return res.status(200).json({
      success: true,
      message: `Welcome back, ${username}!`,
      data: {
        ...payload,
        token: authToken,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

export const recoverPassword = async (
  req: ResetPasswordRequest,
  res: Response,
) => {
  try {
    const { userId } = res.locals.user;
    const { password, oldPassword } = req.body;

    const { password: hashedPassword } = await prisma.user.findUnique({
      where: {
        userId,
      },
    });

    const verify = await bcrypt.compare(oldPassword, hashedPassword);

    if (!verify) {
      return res.status(400).json({
        message: 'Incorrect password',
        success: false,
      });
    }

    const checkTheSame = await bcrypt.compare(password, hashedPassword);

    if (checkTheSame) {
      return res.status(400).json({
        message: 'Password cannot be the same',
        success: false,
      });
    }

    const newPassword = await bcrypt.hash(password, 10);

    await prisma.user.update({
      where: {
        userId,
      },
      data: {
        password: newPassword,
      },
    });

    return res.status(200).json({
      message: 'Password updated successfully',
      success: true,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: 'Internal server error',
      success: false,
    });
  }
};
