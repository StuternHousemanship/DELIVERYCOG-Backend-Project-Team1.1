import { Application } from 'express';
import {
    create,
    activateAccount,
    signIn,
} from '../../Controllers/Auth/Authentication';
import validate from '../../Middlewares/validateRequest';
import verifyToken from '../../Middlewares/Authentication';
import {
    loginValidationRules,
    otpValidationRules,
    registerValidationRules,
} from '../Validation';

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
