import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';
import {
    sendForgotPassword,
    sendOTP,
    welcome,
} from '../../Services/email/mailer';
import AuthService from '../../Services/auth/authentication';
import { User } from '../../Models/User';
import { AppError } from '../../Utilities/errors/appError';
import GlobalQueries from '../../Repository/globalQueries';


const authStore = new AuthService();
const globalQuery = new GlobalQueries();

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
        const userEmail = await globalQuery.exist({
            model: 'users',
            table: 'email',
            value: user.email,
        });
        if (userEmail) {
            return res.status(400).json({
                success: false,
                email: 'Email is already taken',
                message: 'Registration failure',
            });
        }
        const userPhone = await globalQuery.exist({
            model: 'users',
            table: 'phone_number',
            value: user.phone_number,
        });
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

export const activateAccount = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { code } = req.body;
    try {
        const user = await globalQuery.findOne({
            model: 'users',
            table: 'verification_code',
            value: code as number,
        });
        if (user.length === 0) {
            return res.status(401).json({
                message: 'Invalid code',
                success: false,
            });
        }
        if (user[0].is_verified) {
            return res.status(409).json({
                message: 'Email already verified',
                success: false,
            });
        }
        const updateUser = {
            model: 'users',
            table: 'is_verified',
            value: 'true',
            uniqueColumn: 'verification_code',
            uniqueValue: user[0].verification_code as number,
        };
        const modifyUser = await globalQuery.updateOne(updateUser);

        const message = `<p>Welcome to DeliveryCog ${modifyUser[0].first_name}
         your account have been activated.<p>`;

        const userInfo = {
            first_name: modifyUser[0].first_name,
            email: modifyUser[0].email,
            subject: 'Welcome to DeliveryCog',
            message,
        };

        welcome(userInfo);
        return res.status(201).json({
            success: true,
            message: 'Email verification successful',
        });
    } catch (error) {
        console.log(error);
        return next(
            new AppError(`something went wrong here is the error ${error}`, 500)
        );
    }
};
export const forgotPassword = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { email } = req.body;
    const userEmail = await globalQuery.exist({
        model: 'users',
        table: 'email',
        value: email,
    });
    if (!userEmail) {
        return res.status(404).json({
            success: false,
            error: `Forgot Password Failed`,
            message: `User with ${email} not found`,
            data: [req.body],
        });
    }
    const forgot = await authStore.forgotpassword(email);
    if (!forgot) {
        return res.status(500).json({
            success: false,
            error: `Forgot Password Failed`,
            message: `User with ${email}`,
            data: [req.body],
        });
    }
    const message = `<p>
                        ${forgot[0].first_name}, <br> 

                        Someone has requested a code to change your password. You can do this through the link below.  <br> 

                        Code: ${forgot[0].verification_code}
                        <br> 
                        If you didn't request this, please ignore this email. Your password won't change until you access the link above and create a new one.
                        <br> 
                        Thanks,  <br> 
                        Team DeliveryCog <p/>`;
    const data = {
        email: email,
        first_name: forgot[0].first_name,
        code: forgot[0].verification_code,
        subject: 'Resetting your DeliveryCog password',
        message,
    };
    sendForgotPassword(data);

    return res.status(200).json(forgot);
};
