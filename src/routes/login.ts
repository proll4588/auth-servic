import { ERRORS_MAP } from '../errors';
import { getUserByEmail } from '../models/user';
import { generateTokens } from '../utils/generateTokens';
import { router } from './router';
import bcrypt from 'bcrypt';

router.post('/logIn', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await getUserByEmail(email);
    if (!user) return res.status(401).json(ERRORS_MAP['other']);

    const verifiedPassword = await bcrypt.compare(password, user.password);
    if (!verifiedPassword) return res.status(401).json(ERRORS_MAP['other']);

    const tokens = await generateTokens(user.id);

    return res.status(200).json({
      error: false,
      data: {
        tokens,
        userId: user.id,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(ERRORS_MAP['other']);
  }
});
