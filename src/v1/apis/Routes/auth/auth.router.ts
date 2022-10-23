import { Router } from 'express';
import {
    create,
    activateAccount,
    forgotPassword,
    resetPassword,
} from '../../Controllers/auth/auth.controller';
import { validate } from '../../Middlewares/validateRequest';
import {
    emailValidationRules,
    otpValidationRules,
    registerValidationRules,
    restPasswordValidationRules,
} from '../../Utilities/validations/validation';
const auth = Router();

auth.post('/register', registerValidationRules(), validate, create);
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
