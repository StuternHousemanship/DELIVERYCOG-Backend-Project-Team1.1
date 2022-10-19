import express from 'express';
import { create } from '../../controllers/AUTH/authentication';
import validate from '../../middlewares/validateRequest';
import { registerValidationRules } from '../validation';

const authRoutes = (app: express.Application) => {
    app.post(
        '/api/v1/users/auth/register',
        registerValidationRules(),
        validate,
        create
    );
};

export default authRoutes;
