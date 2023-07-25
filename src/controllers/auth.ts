import { Request, Response } from 'express';
import { LoginBody, SignupBody } from 'requests';
import { prisma } from '../lib/prisma';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { envMap } from '../utils/getEnvVars';

const TOKEN_SECRET = envMap.get('TOKEN_SECRET');

export const signupController = async (req: SignupBody, res: Response) => {
  try {
    const { username, email, password, avatar } = req.body;

    let image: string;

    if (!avatar) image = `https://ui-avatars.com/api/?name=${username}`;

    image = avatar;

    if (!username || !email || !password) {
      return res.status(404).json({
        success: false,
        message: 'Please fill all mandatory fields',
      });
    }

    const userToFind = await prisma.user.findFirst({
      where: {
        email,
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
        avatar: image,
        backgroundImage: '',
      },
    });

    const payload = {
      userId: userToFind.userId,
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
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

export const loginController = async (req: LoginBody, res: Response) => {
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
