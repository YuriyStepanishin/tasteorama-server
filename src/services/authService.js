import { FIFTEEN_MINUTES, ONE_DAY } from '../constants/times.js';
import { Session } from '../models/sessionModel.js';

export const createSession = async(userId) => {
    const accessToken = crypto.randomUUID();
    const refreshToken = crypto.randomUUID();

    const accessTokenValidUntil = new Date(Date.now() + FIFTEEN_MINUTES);
    const refreshTokenValidUntil = new Date(Date.now() + ONE_DAY);

    return Session.create({
        userId,
        accessToken,
        refreshToken,
        accessTokenValidUntil,
        refreshTokenValidUntil,
    });
};

export const setSessionCookie = async(res, session) => {
    const isProduction = process.env.NODE_ENV === 'production';

    const cookieOptions = {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? 'none' : 'lax',
    };

    res.cookie('sessionId', session._id, {
        ...cookieOptions,
        maxAge: ONE_DAY,
    });
    res.cookie('accessToken', session.accessToken, {
        ...cookieOptions,
        maxAge: FIFTEEN_MINUTES,
    });
    res.cookie('refreshToken', session.refreshToken, {
        ...cookieOptions,
        maxAge: ONE_DAY,
    });
};
