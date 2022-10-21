import { Application } from 'express';
import {
    create,
    activateAccount,
    signIn,
} from '../../controllers/AUTH/authentication';
import validate from '../../middlewares/validateRequest';
import verifyToken from '../../middlewares/Authentication';
import {
    loginValidationRules,
    otpValidationRules,
    registerValidationRules,
} from '../validation';

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
        validate,
        activateAccount
    );
    app.post(
        '/api/v1/auth/sign-in',
        loginValidationRules(),
        validate,
        verifyToken,
        signIn
    );
};

export default authRoutes;
