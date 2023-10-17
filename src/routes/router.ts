import { Router } from 'express';
import { updateRouter } from './update';
import { logoutRouter } from './logout';
import { loginRouter } from './login';
import { signUpRouter } from './signup';

export const router = Router();

router.use(loginRouter);
router.use(logoutRouter);
router.use(signUpRouter);
router.use(updateRouter);
