import { Router } from 'express';
import {
    create,
    activateAccount,
    forgotPassword,
    resetPassword,
    login,
} from '../../Controllers/auth/auth.controller';
import { validate } from '../../Middlewares/validateRequest.middleware';
import {
    emailValidationRules,
    otpValidationRules,
    registerValidationRules,
    restPasswordValidationRules,
    loginValidationRules,
} from '../../Utilities/validations/validation';
import verifyToken from '../../Middlewares/verifyToken.middleware';

const auth = Router();

auth.post('/register', registerValidationRules(), validate, create);

auth.post('/login', loginValidationRules(), validate, login);

auth.post(
    '/account-activation',
    otpValidationRules(),
    validate,
    activateAccount
);

auth.post('/forgot-password', emailValidationRules(), validate, forgotPassword);

auth.post(
    '/reset-password',
    restPasswordValidationRules(),
    validate,
    resetPassword
);

export default auth;
