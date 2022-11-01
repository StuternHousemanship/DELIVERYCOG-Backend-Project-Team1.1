import { Router } from 'express';
import {
    create,
    login,
    activateAccount,
} from '../../Controllers/Auth/auth.controller';
import { validate } from '../../Middlewares/validateRequest.middleware';
import {
    otpValidationRules,
    registerValidationRules,
    loginValidationRules,
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

export default auth;
