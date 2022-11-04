import { Router } from 'express';
import {
    create,
    login,
    activateAccount,forgotPassword,resetPassword
} from '../../Controllers/Auth/auth.controller';
import { validate } from '../../Middlewares/validateRequest.middleware';
import {
    otpValidationRules,
    registerValidationRules,
    loginValidationRules,emailValidationRules,restPasswordValidationRules
} from '../../Utilities/Validations/reqValidation';
import { verifyToken } from '../../Middlewares/verifyToken.middleware';

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
