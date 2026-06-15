import createHttpError from "http-errors";
import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import { generateToken } from "../services/tokenService.js";

export const registerUser = async (req, res) => {
  const { email, name, password } = req.body;

  const isExistEmail = await User.findOne({ email });

  if (isExistEmail) {
    throw createHttpError(409, "User with this email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    email,
    name,
    password: hashedPassword,
  });

  const token = generateToken(newUser._id);

  const userResponse = newUser.toObject();
  delete userResponse.password;

  res.status(201).json({
    user: userResponse,
    token,
  });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw createHttpError(401, "Invalid credentials");
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    throw createHttpError(401, "Invalid credentials");
  }

  const token = generateToken(user._id);

  const userResponse = user.toObject();
  delete userResponse.password;

  res.status(200).json({
    user: userResponse,
    token,
  });
};

export const logoutUser = async (req, res) => {
  res.status(204).send();
};
