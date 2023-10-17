import { createUser, getUserByEmail } from './../models/user';
import bcrypt from 'bcrypt';
import { generateTokens } from '../utils/generateTokens';
import { ERRORS_MAP } from '../errors';
import { Router } from 'express';

export const signUpRouter = Router();

signUpRouter.post('/signUp', async (req, res) => {
  const { email, password } = req.body;
  const saltEnv = Number(process.env.SALT);

  try {
    const userCandidat = await getUserByEmail(email);
    if (userCandidat) return res.status(400).json(ERRORS_MAP['userExist']);

    const salt = bcrypt.genSaltSync(saltEnv);
    const hashPassword = bcrypt.hashSync(password, salt);

    const user = await createUser(email, hashPassword);
    if (!user) return res.status(400).json(ERRORS_MAP['other']);

    const tokens = await generateTokens(user.id);

    return res.status(200).json({ tokens });
  } catch (err) {
    console.log(err);
    return res.status(500).json(ERRORS_MAP['other']);
  }
});
