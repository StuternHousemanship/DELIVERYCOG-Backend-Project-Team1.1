import { Router } from 'express';
import authRouter from './auth/auth.router';
import swaggerDoc from 'swagger-ui-express';
import swaggerDocumentation from '../Docs/swagger.config';

const router = Router();

router.use('/auth', authRouter);
router.use('/docs', swaggerDoc.serve);
router.use('/docs', swaggerDoc.setup(swaggerDocumentation));

export default router;
