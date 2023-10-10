import jwt from 'jsonwebtoken';
import { refreshTokenLifeTime, tokenLifeTime } from '../constants';
import { TokenPayload } from '../types';

export const signAccessToken = (payload: TokenPayload) => {
  const accessPrivatKey = process.env.ACCESS_TOKEN_PRIVATE_KEY as string;

  const accessToken = jwt.sign(payload, accessPrivatKey, {
    expiresIn: tokenLifeTime,
  });

  return accessToken;
};

export const signRefreshToken = (payload: TokenPayload) => {
  const refreshPrivatKey = process.env.REFRESH_TOKEN_PRIVATE_KEY as string;

  const refreshToken = jwt.sign(payload, refreshPrivatKey, {
    expiresIn: refreshTokenLifeTime,
  });

  return refreshToken;
};
