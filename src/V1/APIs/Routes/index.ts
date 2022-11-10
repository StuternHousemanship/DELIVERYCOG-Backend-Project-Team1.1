import { Router } from 'express';
import authRouter from './auth/auth.router';
import orderRouter from './order/orderRoute';
import swaggerDoc from 'swagger-ui-express';
import swaggerDocumentation from '../Docs/swagger.config';

const router = Router();

router.use('/auth', authRouter);
router.use('/documentation', swaggerDoc.serve);
router.use('/documentation', swaggerDoc.setup(swaggerDocumentation));

export default router;
