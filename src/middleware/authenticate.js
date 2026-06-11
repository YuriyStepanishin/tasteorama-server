import createHttpError from 'http-errors';
import { User } from '../models/user.js';
import { Session } from '../models/session.js';

export const authenticate = async (req, res, next) => {
  const { accessToken, sessionId } = req.cookies;
  if (!accessToken || !sessionId) {
    throw createHttpError(401, 'Missing session creadentials');
  }

  const session = await Session.findOne({ accessToken, _id: sessionId });
  if (!session) {
    throw createHttpError(401, 'Session not found');
  }

  const isAceessTokenExpired = session.isAceessTokenExpired < new Date();
  if (isAceessTokenExpired) {
    throw createHttpError(401, 'Access token expired');
  }

  const user = await User.findOne({ _id: session.userId });
  if (!user) {
    throw createHttpError(401, 'User not found');
  }

  req.user = user;
  next();
};
