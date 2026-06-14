import createHttpError from 'http-errors';
import { User } from '../models/userModel.js';
import bcrypt from 'bcrypt';
import { createSession, setSessionCookie } from '../services/authService.js';
import { Session } from '../models/sessionModel.js';
// import jwt from 'jsonwebtoken';
// import fs from 'node:fs/promises';
// import path from 'node:path';
// import handlebars from 'handlebars';
// import { sendEmail } from '../utils/sendMail.js';

// export const registerUser = async (req, res) => {
//   const { email, name, password } = req.body;

//   const isExistEmail = await User.findOne({ email });
//   if (isExistEmail) {
//     throw createHttpError(409, 'Email in use');
//   }

//   const hashedPassword = await bcrypt.hash(password, 10);

//   const newUser = await User.create({ email, name, password: hashedPassword });
//   const newSession = await createSession(newUser._id);
//   setSessionCookie(res, newSession);
//   res.status(201).json(newUser);
// };

export const loginUser = async(req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        throw createHttpError(401, 'Invalid credentials');
    }
    const isValidPassword = await bcrypt.compare(
        password,
        user.password,
    )
    if (!isValidPassword) {
        throw createHttpError(401, 'Invalid credentials');
    }
    await Session.deleteOne({ userId: user._id });
    const session = await createSession(user._id);
    setSessionCookie(res, session);

    res.status(200).json(user);
}

export const logoutUser = async(req, res) => {
    const { sessionId } = req.cookies;

    if (sessionId) {
        await Session.deleteOne({ _id: sessionId });
    }

    res.clearCookie('sessionId');
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');

    res.status(204).send();
};

// export const refreshSession = async (req, res) => {
//   const { sessionId, refreshToken } = req.cookies;

//   if (!sessionId || !refreshToken) {
//     throw createHttpError(401, 'Missing session credentials');
//   }

//   const session = await Session.findOne({ _id: sessionId, refreshToken });

//   if (!session) {
//     throw createHttpError(401, 'Session not found');
//   }

//   const isRefreshTokenExpired = session.refreshTokenValidUntil < new Date();

//   if (isRefreshTokenExpired) {
//     await session.deleteOne();
//     res.clearCookie('sessionId');
//     res.clearCookie('accessToken');
//     res.clearCookie('refreshToken');
//     throw createHttpError(401, 'Refresh token expired');
//   }

//   await session.deleteOne();

//   const newSession = await createSession(session.userId);
//   setSessionCookie(res, newSession);

//   res.status(200).json({ message: 'Successfully refreshed a session!' });
// };
