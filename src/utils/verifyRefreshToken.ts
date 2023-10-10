import { getToken } from '../models/token';
import jwt from 'jsonwebtoken';
import { TokenPayload } from '../types';

export const verifyRefreshToken = async (refreshToken: string) => {
  const privateKey = process.env.REFRESH_TOKEN_PRIVATE_KEY as string;

  const refreshTokenFromDB = getToken(refreshToken);
  if (!refreshTokenFromDB) return null;

  const tokenDetails = jwt.verify(refreshToken, privateKey) as TokenPayload;
  if (!tokenDetails) return null;

  return tokenDetails;
};
