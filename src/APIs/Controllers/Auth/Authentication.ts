import { Request, Response, NextFunction } from 'express';

import AuthService from '../../../Services/Auth/Authentication';

const authStore = new AuthService();

export const create = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    await authStore.createUser(req, res, next);
};

export const activateAccount = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    await authStore.activateAccount(req, res, next);
};

export const signIn = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    await authStore.authenticateUser(req, res, next);
};
