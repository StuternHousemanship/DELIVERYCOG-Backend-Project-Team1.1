import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';
import { sendOTP } from '../../../services/EMAIL/mailer';
import { AuthService, User } from '../../../services/AUTH/authentication';
import { validateEmail, validatePhoneNumber } from '../validation';
import AppError from '../../../services/ERRORS/appError';

const authStore = new AuthService();

export const create = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const code = crypto.randomInt(100000, 1000000);
    try {
        const user: User = {
            first_name: req.body.firstName,
            last_name: req.body.lastName,
            password_digest: req.body.password,
            phone_number: req.body.phoneNumber,
            email: req.body.email,
            verification_code: code,
        };
        const userEmail = await validateEmail(user.email);
        if (userEmail) {
            return res.status(400).json({
                success: false,
                email: 'Email is already taken',
                message: 'Registration failure',
            });
        }
        const userPhone = await validatePhoneNumber(user.phone_number);
        if (userPhone) {
            return res.status(400).json({
                success: false,
                email: 'Phone number is already taken',
                message: 'Registration failed',
            });
        }
        if (userEmail === undefined && userPhone === undefined) {
            const registerUser = await authStore.createUser(user);
            if (!registerUser) {
                return res.status(400).json({
                    success: false,
                    message: 'Registration failed',
                });
            }
            if (registerUser) {
                const message = `<p>Hello ${registerUser[0].first_name},</p>
                <p>Welcome to DeliveryCog Platform. Please verify your 
                email address with the OTP code below. It would expire after 10mins.<p>
                <p>OTP: <b>${registerUser[0].verification_code}</b></p>`;
                const userInfo = {
                    first_name: registerUser[0].first_name,
                    email: registerUser[0].email,
                    subject: 'Verify your DeliveryCog Account',
                    code: registerUser[0].verification_code as number,
                    message,
                };
                await sendOTP(userInfo);
                return res.status(200).json({
                    success: true,
                    message:
                        'Account successfully created, Check your mail for activation code',
                });
            }
        }
    } catch (error) {
        return res.send(new AppError(`something went wrong ${error}`, 500));
    }
};

export default create;
