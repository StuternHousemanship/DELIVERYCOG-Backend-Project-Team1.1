// import { Application } from 'express';
// import {
//     create,
//     activateAccount,
//     forgotPassword,
// } from '../../Controllers/auth/authentication';
// import { validate } from '../../Middlewares/validateRequest';
// import {
//     emailValidationRules,
//     otpValidationRules,
//     registerValidationRules,
// } from '../../Utilities/validations/validation';

// const authRoutes = (app: Application) => {
//     app.post(
//         '/api/v1/auth/register',
//         registerValidationRules(),
//         validate,
//         create
//     );
//     app.post(
//         '/api/v1/auth/account-activation',
//         otpValidationRules(),
//         activateAccount
//     );
//     app.post(
//         '/api/v1/auth/forgot-password',
//         emailValidationRules(),
//         validate,
//         forgotPassword
//     );
// };

// export default authRoutes;
import { Router } from 'express';
import {
    create,
    activateAccount,
    forgotPassword,
} from '../../Controllers/auth/authentication';
import { validate } from '../../Middlewares/validateRequest';
import {
    emailValidationRules,
    otpValidationRules,
    registerValidationRules,
} from '../../Utilities/validations/validation';
const auth = Router();

auth.post('/register', registerValidationRules(), validate, create);
auth.post('/account-activation', otpValidationRules(), activateAccount);
auth.post('/forgot-password', emailValidationRules(), validate, forgotPassword);
auth.post('/reset-password/', resetPassword);

export default auth;
