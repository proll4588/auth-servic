import { Router } from 'express';
import { ERRORS_MAP } from '../errors';
import { getUserByEmail } from '../models/user';
import { generateTokens } from '../utils/generateTokens';
import bcrypt from 'bcrypt';

export const loginRouter = Router();

// TODO: Добавить новуые обработчики ошибок
// - нет такого пользователя
// - неправильный пароль
loginRouter.post('/logIn', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await getUserByEmail(email);
    if (!user) return res.status(401).json(ERRORS_MAP['other']);

    const verifiedPassword = await bcrypt.compare(password, user.password);
    if (!verifiedPassword) return res.status(401).json(ERRORS_MAP['other']);

    const tokens = await generateTokens(user.id);
    return res.status(200).json({ tokens });
  } catch (err) {
    console.log(err);
    return res.status(500).json(ERRORS_MAP['other']);
  }
});
