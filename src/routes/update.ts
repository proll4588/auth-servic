import { ERRORS_MAP } from '../errors';
import { verifyRefreshToken } from '../utils/verifyRefreshToken';
import { signAccessToken } from '../utils/signToken';
import { Router } from 'express';

export const updateRouter = Router();

updateRouter.post('/update', async (req, res) => {
  const { refreshToken } = req.body;

  try {
    const tokenPayload = await verifyRefreshToken(refreshToken);
    if (!tokenPayload) return res.status(400).json(ERRORS_MAP['other']);

    const accessToken = signAccessToken({ userId: tokenPayload.userId });

    // TODO: Обновлять и refresh token
    return res.status(200).json({ accessToken });
  } catch (e) {
    console.error(e);
    res.status(400).json(ERRORS_MAP['other']);
  }
});
