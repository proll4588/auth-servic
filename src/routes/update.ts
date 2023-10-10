import { ERRORS_MAP } from '../errors';
import { verifyRefreshToken } from '../utils/verifyRefreshToken';
import { router } from './router';
import { signAccessToken } from '../utils/signToken';

router.post('/update', async (req, res) => {
  const { refreshToken } = req.body;

  try {
    const tokenPayload = await verifyRefreshToken(refreshToken);
    if (!tokenPayload) return res.status(400).json(ERRORS_MAP['other']);

    const accessToken = signAccessToken(tokenPayload);

    return res.status(200).json({
      error: false,
      data: {
        accessToken,
      },
      message: 'Access token created successfully',
    });
  } catch (e) {
    console.error(e);
    res.status(400).json(ERRORS_MAP['other']);
  }
});
