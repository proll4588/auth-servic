import { Router } from 'express';
import { deleteToken, getToken } from '../models/token';
import { ERRORS_MAP } from '../errors';

export const logoutRouter = Router();

logoutRouter.post('/logout', async (req, res) => {
  const { refreshToken } = req.body;

  try {
    const token = await getToken(refreshToken);
    if (token) await deleteToken(refreshToken);

    return res.status(200);
  } catch (err) {
    console.log(err);
    res.status(500).json(ERRORS_MAP['other']);
  }
});
