import { Request, Response, NextFunction } from 'express';
import crypto, { createHmac } from 'crypto';
import dotenv from 'dotenv';
import { AppError } from '../../Utilities/Errors/appError';
import { UserType, User } from '../../Models/User';
import { response } from '../../Utilities/response';
import bcrypt, { Encryption } from '../../Utilities/bcrypt';
import Email from '../Email/mailer';
import AuthRepository from '../../Repository/auth/auth.repository';
import Validations from '../../Utilities/Validations/validation';

const validation = new Validations();

const authRepository = new AuthRepository();
const mail = new Email();

dotenv.config({ path: './src/V1/APIs/Config/.env' });

export default class AuthService {
    public async registerUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { firstName, lastName, password, phoneNumber, email } =
                req.body;
            const code = crypto.randomInt(100000, 1000000);
            const user = {
                first_name: firstName,
                last_name: lastName,
                password_digest: password,
                phone_number: phoneNumber,
                email,
                verification_code: code,
            };
            const userEmail = await validation.validateEmail(user.email);
            if (userEmail) {
                return res.status(400).json({
                    success: false,
                    error:' Email is already taken',
                    message: 'Registration failed!',
                });
            }
            const userPhone = await validation.validatePhoneNumber(
                user.phone_number
            );
            if (userPhone) {
                return res.status(400).json({
                    success: false,
                    error:'Phone number is already taken',
                    message: 'Registration failed!',
                });
            }
            if (userEmail === undefined && userPhone === undefined) {
                const registerUser: UserType = await authRepository.createUser(
                    user
                );
                if (!registerUser) {
                    return res.status(400).json({
                        success: false,
                        error:'Unable to create user',
                        message: 'Registration failed',
                    });
                }
                if (registerUser) {
                    const message = `<p>Hello ${registerUser.first_name},</p>
                <p>Welcome to DeliveryCog Platform. Please verify your 
                email address with the OTP code below. It would expire after 10mins.<p>
                <p>OTP: <b>${registerUser.verification_code}</b></p>`;
                    const userInfo = {
                        first_name: registerUser.first_name,
                        email: registerUser.email,
                        subject: 'Verify your DeliveryCog Account',
                        code: Number(registerUser.verification_code),
                        message,
                    };

                    await mail.sendOTP(userInfo);
                    return res.status(201).json({
                        success: true,
                        message:
                            'Account successfully created, Check your mail for activation code',
                    });
                }
            }
        } catch (error) {
            console.log(error);
            return next(new AppError(`something went wrong ${error}`, 500));
        }
    }
    public async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;
            const usercheck: any = await User.query().where(
                'email',
                '=',
                email
            );
           
            if(usercheck.length === 0) {
                return res.status(404).json({
                    success: false,
                    error:'Incorrect Email or password',
                    message: 'Login failed!',
                });
            }
            if (!usercheck[0].is_verified) {
                return res.status(422).json({
                    success: false,
                    message:
                        'User account is not active, Kindly activate account',
                });
            }
            const user = await authRepository.authenticate(email, password);
            if (user) {
                const token = await bcrypt.generateAccessToken(user);
                const newDate = () => {
                    const currentdate = new Date();
                    const datetime = `Last Sync: ${currentdate.getDate()}/${
                        currentdate.getMonth() + 1
                    }/${currentdate.getFullYear()} @ ${currentdate.getHours()}:${currentdate.getMinutes()}:${currentdate.getSeconds()}`;
                    return datetime;
                };
                const message = `
            <p>Welcome to DYC Platform ${
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
                const profile = {
                    email: user[0].email,
                    firstName: user[0].first_name,
                    lastName: user[0].last_name,
                    expiresIn: 1800,
                    token,
                };
                res.setHeader('Set-Cookie', token);
                res.cookie('token', token, {
                    expires: new Date(Date.now() + 1800),
                });
                await mail.sendLoginConfirmation(userInfo);
                res.status(200).json(
                    response({ message: 'Login Successful', data: profile })
                );
            } else {
                return res.status(403).json(
                    response({
                        message: 'Failed login attempt',
                        error: 'Incorrect password',
                        success: false,
                    })
                );
            }
        } catch (error) {
            console.log(error);
            return next(
                new AppError(
                    `something went wrong here is the error ${error}`,
                    500
                )
            );
        }
    }

    public async activateAccount(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const { code } = req.body;
            const user: any = await User.query().where(
                'verification_code',
                '=',
                code
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
            const modifyUser: any = await User.query()
                .patch({ is_verified: 'true' })
                .where('verification_code', '=', code);
            const message = `<p>Welcome to DeliveryCog ${user[0].first_name}
         your account have been activated.<p>`;
            if (modifyUser) {
                const userInfo = {
                    first_name: user[0].first_name,
                    email: user[0].email,
                    subject: 'Welcome to DeliveryCog',
                    message,
                };

                await mail.sendWelcome(userInfo);
                return res.status(201).json({
                    success: true,
                    message: 'Email verification successful',
                });
            }
        } catch (error) {
            return next(
                new AppError(
                    `something went wrong here is the error ${error}`,
                    500
                )
            );
        }
    }
}
