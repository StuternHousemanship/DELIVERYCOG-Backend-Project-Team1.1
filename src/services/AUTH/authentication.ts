import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';
import {
    sendOTPMail,
    welcomeMail,
    loginConfirmationMail,
} from '../EMAIL/mailer';
import AuthRepository from '../../Repository/AUTH/authentication';

import GlobalQueries from '../../Repository/globalQueries';

import { User } from '../../models/User';
import AppError from '../ERRORS/appError';

import {
    validateEmail,
    isActive,
    validatePhoneNumber,
    generateAccessToken,
} from '../../utilities/validation';

const authRepository = new AuthRepository();
const globalQuery = new GlobalQueries();

class authStore {
    async createUser(req: Request, res: Response, next: NextFunction) {
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
                const registerUser = await authRepository.createUser(user);
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
                    await sendOTPMail(userInfo);
                    const token = await generateAccessToken(registerUser);
                    return res.status(200).json({
                        token,
                        success: true,
                        message:
                            'Account successfully created, Check your mail for activation code',
                    });
                }
            }
        } catch (error) {
            return res.send(new AppError(`something went wrong ${error}`, 500));
        }
    }

    async activateAccount(req: Request, res: Response, next: NextFunction) {
        const { code } = req.body;
        try {
            const user = await globalQuery.findOne(
                'users',
                'verification_code',
                code as number
            );
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
                table: 'users',
                setColumn: 'is_verified',
                setValue: 'true',
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

            await welcomeMail(userInfo);
            return res.status(201).json({
                success: true,
                message: 'Email verification successful',
            });
        } catch (error) {
            return next(new AppError(`something went wrong! ${error}`, 500));
        }
    }

    async authenticateUser(req: Request, res: Response, next: NextFunction) {
        const { email, password } = req.body;
        try {
            const usercheck = Boolean(await isActive(email));
            if (usercheck.toString() === 'false') {
                return res.status(422).json({
                    success: false,
                    error: 'User account is not active, Kindly activate account',
                });
            }
            const user = await authRepository.authenticate({ email, password });
            if (user) {
                const token = generateAccessToken(user);

                const newDate = () => {
                    const currentdate = new Date();
                    const datetime = `Last Sync: ${currentdate.getDate()}/${
                        currentdate.getMonth() + 1
                    }/${currentdate.getFullYear()} @ ${currentdate.getHours()}:${currentdate.getMinutes()}:${currentdate.getSeconds()}`;
                    return datetime;
                };

                const message = `
            <p>Welcome to DeliveryCog Team ${
                user[0].first_name
            }, we notice you just login your account at time: ${newDate()}
            if you didn't initiate this login, please change your password now.
                someone may be trying to gain access to your account</p>`;

                const userInfo = {
                    first_name: user[0].first_name,
                    email: user[0].email,
                    subject: 'Login Notification',
                    message,
                };
                await loginConfirmationMail(userInfo);

                const profile = {
                    token,
                    email: user[0].email,
                    firstName: user[0].first_name,
                    lastName: user[0].last_name,
                    expiresIn: 1800,
                };
                res.setHeader('Set-Cookie', token);
                res.cookie('token', token, {
                    expires: new Date(Date.now() + 1800),
                });

                res.send({
                    ...profile,
                    message: 'Login successful',
                    success: true,
                });
            } else {
                return res.status(403).json({
                    message: 'Failed login attempt',
                    email: 'Incorrect password',
                    success: false,
                });
            }
        } catch (error) {
            return next(new AppError(`something went wrong ${error}`, 500));
        }
    }
}

export default authStore;
