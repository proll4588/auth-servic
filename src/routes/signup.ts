import { createUser, getUserByEmail } from './../models/user';
import bcrypt from 'bcrypt';
import { generateTokens } from '../utils/generateTokens';
import { ERRORS_MAP } from '../errors';
import { router } from './router';

router.post('/signUp', async (req, res) => {
  const { email, password } = req.body;
  const saltEnv = Number(process.env.SALT);

  try {
    const userCandidat = await getUserByEmail(email);
    if (userCandidat) return res.status(400).json(ERRORS_MAP['userExist']);

    const salt = await bcrypt.genSalt(saltEnv);
    const hashPassword = await bcrypt.hash(password, salt);

    const user = await createUser(email, hashPassword);
    if (!user) return res.status(400).json(ERRORS_MAP['other']);

    const tokens = await generateTokens(user.id);

    res.status(201).json({
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
