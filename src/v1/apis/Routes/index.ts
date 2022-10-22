import { Router } from 'express';
import authRouter from './auth/authentication.router';

const router = Router();

router.use('/auth', authRouter);

export default router;
