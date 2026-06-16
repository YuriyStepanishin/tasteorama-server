<<<<<<< feature/auth-register
import jwt from "jsonwebtoken";
import createHttpError from "http-errors";
import { User } from "../models/userModel.js";

export const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw createHttpError(401, "No token");
  }

  const [, token] = authHeader.split(" ");

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(id);
    if (!user) {
      throw createHttpError(401, "User not found");
    }

    req.user = user;
    next();
  } catch (err) {
    throw createHttpError(401, "Invalid token");
  }
=======
import createHttpError from 'http-errors';
import { User } from '../models/userModel.js';
import { Session } from '../models/sessionModel.js';

export const authenticate = async (req, res, next) => {
  const { accessToken, sessionId } = req.cookies;
  if (!accessToken || !sessionId) {
    throw createHttpError(401, 'Missing session credentials');
  }

  const session = await Session.findOne({ accessToken, _id: sessionId });
  if (!session) {
    throw createHttpError(401, 'Session not found');
  }

  const isAccessTokenExpired = session.accessTokenValidUntil < new Date();
  if (isAccessTokenExpired) {
    throw createHttpError(401, 'Access token expired');
  }

  const user = await User.findOne({ _id: session.userId });
  if (!user) {
    throw createHttpError(401, 'User not found');
  }

  req.user = user;
  next();
>>>>>>> main
};
