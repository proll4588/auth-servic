import { addTokenToUser } from '../models/token';
import { FullTokens, TokenPayload } from '../types';
import { signAccessToken, signRefreshToken } from './signToken';

export const generateTokens = async (userId: number) => {
  const accessPayload: TokenPayload = { userId };
  const refreshPayload: TokenPayload = { userId };

  const accessToken = signAccessToken(accessPayload);
  const refreshToken = signRefreshToken(refreshPayload);

  await addTokenToUser(userId, refreshToken);

  return { accessToken, refreshToken } as FullTokens;
};
