//controllers/authController.js

import createHttpError from 'http-errors';
import { User } from '../models/userModel.js';
import bcrypt from 'bcrypt';
import { createSession, setSessionCookie } from '../services/authService.js';
import { Session } from '../models/sessionModel.js';

export const registerUser = async (req, res) => {
  const { email, name, password } = req.body;

   if (!name || name.length < 2 || name.length > 16) {
    throw createHttpError(400, "Name must be 2-16 characters");
  }

  if (!email || email.length > 128) {
    throw createHttpError(400, "Email max length is 128");
  }

  if (!password || password.length < 8 || password.length > 128) {
    throw createHttpError(400, "Password must be 8-128 characters");
  }


  const isExistEmail = await User.findOne({ email });
  if (isExistEmail) {
    throw createHttpError(409, 'Email in use');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    email,
    name,
    password: hashedPassword,
  });

  const newSession = await createSession(newUser._id);
  setSessionCookie(res, newSession);

res.status(201).json({
    user: {
      _id: newUser._id,
      email: newUser.email,
      name: newUser.name,
    },
  });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw createHttpError(401, 'Invalid credentials');
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    throw createHttpError(401, 'Invalid credentials');
  }

  await Session.deleteOne({ userId: user._id });

  const newSession = await createSession(user._id);
  setSessionCookie(res, newSession);

res.status(200).json({
  user: {
    _id: user._id,
    email: user.email,
    name: user.name,
  },
});
};

export const logoutUser = async (req, res) => {
  const { sessionId } = req.cookies;

  if (sessionId) {
    await Session.deleteOne({ _id: sessionId });
  }

 const isProd = process.env.NODE_ENV === "production";

const cookieOptions = {
  httpOnly: true,
  secure: isProd,
  sameSite: isProd ? 'none' : 'lax',
};

res.clearCookie('sessionId', cookieOptions);
res.clearCookie('accessToken', cookieOptions);
res.clearCookie('refreshToken', cookieOptions);

  res.status(204).send();
};

export const refreshSession = async (req, res) => {
  const { sessionId, refreshToken } = req.cookies;

  if (!sessionId || !refreshToken) {
    throw createHttpError(401, 'Missing session credentials');
  }

  const session = await Session.findOne({
    _id: sessionId,
    refreshToken,
  });

  if (!session) {
    throw createHttpError(401, 'Session not found');
  }

  if (session.refreshTokenValidUntil < new Date()) {
    await session.deleteOne();

    res.clearCookie('sessionId');
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');

    throw createHttpError(401, 'Refresh token expired');
  }

  await session.deleteOne();

  const newSession = await createSession(session.userId);
  setSessionCookie(res, newSession);

  res.status(200).json({ message: 'Session refreshed' });
};

export const getMe = (req, res) => {
  res.json({
    user: req.user,
  });
};
