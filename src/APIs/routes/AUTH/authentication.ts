import { Application } from 'express';
import { create, activateAccount } from '../../controllers/AUTH/authentication';
import validate from '../../middlewares/validateRequest';
import { otpValidationRules, registerValidationRules } from '../validation';

const authRoutes = (app: Application) => {
    app.post(
        '/api/v1/auth/register',
        registerValidationRules(),
        validate,
        create
    );
    app.post(
        '/api/v1/auth/account-activation',
        otpValidationRules(),
        activateAccount
    );
};

export default authRoutes;
