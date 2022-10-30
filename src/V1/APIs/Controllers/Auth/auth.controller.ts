import express, { Request, Response, NextFunction } from 'express';
import AuthService from '../../Services/Auth/auth.service';
const authStore = new AuthService();

export const create = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    await authStore.registerUser(req, res, next);
};
export const login = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    return await authStore.login(req, res, next);
};
export const activateAccount = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    return await authStore.activateAccount(req, res, next);
};
