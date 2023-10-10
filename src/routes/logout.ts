import { deleteToken, getToken } from '../models/token';
import { router } from './router';

router.delete('/logout', async (req, res) => {
  const { refreshToken } = req.body;

  try {
    const token = await getToken(refreshToken);
    if (token) await deleteToken(refreshToken);

    return res
      .status(200)
      .json({ error: false, message: 'Logged Out Sucessfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: true, message: 'Internal Server Error' });
  }
});
