import { Request, Response, NextFunction } from 'express';
import AuthService from '../../Services/auth/auth.service';
import { User } from '../../Models/User';
import { AppError } from '../../Utilities/errors/appError';
import crypto from 'crypto';

const authStore = new AuthService();

export const create = async (req: Request, res: Response) => {
    try {
        const { firstName, lastName, password, phoneNumber, email } = req.body;
        const code = crypto.randomInt(100000, 1000000);
        const user: User = {
            first_name: firstName,
            last_name: lastName,
            password_digest: password,
            phone_number: phoneNumber,
            email,
            verification_code: code,
        };
        return await authStore.register(res, user);
    } catch (error) {
        return res.send(new AppError(`something went wrong ${error}`, 500));
    }
};
export const login = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { email, password } = req.body;
        return await authStore.login(res, email, password);
    } catch (error) {
        return res.send(
            new AppError(`something went wrong here is the error ${error}`, 500)
        );
    }
};
export const activateAccount = async (req: Request, res: Response) => {
    const { code } = req.body;
    try {
        return await authStore.activateAccount(res, code);
    } catch (error) {
        return res.send(
            new AppError(`something went wrong here is the error ${error}`, 500)
        );
    }
};
export const resetPassword = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { password, confirm_password, code, email } = req.body;
        return await authStore.resetPassword(
            res,
            password,
            confirm_password,
            code,
            email
        );
    } catch (error) {
        return res.send(new AppError(`something went wrong ${error}`, 500));
    }
};
export const forgotPassword = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        return await authStore.forgotpassword(res, email);
    } catch (error) {
        return res.send(new AppError(`something went wrong ${error}`, 500));
    }
};
