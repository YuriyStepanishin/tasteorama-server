//middleware/authenticate.js


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
};
