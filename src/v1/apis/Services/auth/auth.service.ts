import crypto, { createHmac } from 'crypto';
import { Encryption } from '../../Utilities/bcrypt';
import { User } from '../../Models/User';
import GlobalQueries from '../../Repository/globalQueries';
import { Response } from 'express';
import { response } from '../../Utilities/response';
import {
    sendOTP,
    welcome,
    sendForgotPassword,
    sendResetSuccess,
} from '../email/mailer';
import AuthRepository from '../../Repository/auth/auth.repository';

const globalQuery = new GlobalQueries();
const authRepository = new AuthRepository();
export default class AuthService {
    public async createUser(res: Response, user: User) {
        const userEmail = await globalQuery.exist({
            model: 'users',
            table: 'email',
            value: user.email,
        });

        if (userEmail) {
            return res.status(400).json(
                response({
                    message: 'Registration failure',
                    error: 'Email is already taken',
                    success: false,
                })
            );
        }

        const userPhone = await globalQuery.exist({
            model: 'users',
            table: 'phone_number',
            value: user.phone_number,
        });

        if (userPhone) {
            return res.status(400).json(
                response({
                    message: 'Registration failure',
                    error: 'Phone number is already taken',
                    success: false,
                })
            );
        }
        const registerUser = await authRepository.createUser(user);

        if (!registerUser) {
            return res.status(400).json({
                success: false,
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

            await sendOTP(userInfo);

            return res.status(201).json({
                success: true,
                message:
                    'Account successfully created, Check your mail for activation code',
            });
        }
    }
    public async activateAccount(res: Response, code: string | number) {
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
        if (user.is_verified) {
            return res.status(409).json({
                message: 'Email already verified',
                success: false,
            });
        }
        const modifyUser = await globalQuery.updateOne({
            model: 'users',
            table: 'is_verified',
            value: 'true',
            uniqueColumn: 'verification_code',
            uniqueValue: Number(user.verification_code),
        });

        const message = `<p>Welcome to DeliveryCog ${modifyUser.first_name}
         your account have been activated.<p>`;

        const userInfo = {
            first_name: modifyUser.first_name,
            email: modifyUser.email,
            subject: 'Welcome to DeliveryCog',
            message,
        };

        welcome(userInfo);
        return res.status(201).json({
            success: true,
            message: 'Email verification successful',
        });
    }
    public async forgotpassword(res: Response, email: string) {
        const code = crypto.randomInt(100000, 1000000);
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
                data: [email],
            });
        }
        const user: User = await globalQuery.updateOne({
            model: 'users',
            table: 'verification_code',
            value: code,
            uniqueColumn: 'email',
            uniqueValue: email,
        });

        if (!user) {
            return res.status(500).json({
                success: false,
                error: `Forgot Password Failed`,
                message: `User with ${email} failed`,
                data: [email],
            });
        }
        const message = `<p>
                        ${user.first_name}, <br> 
                        Someone has requested a code to change your password. You can do this through the link below.  <br> 
                        Code: ${user.verification_code}
                        <br> 
                        If you didn't request this, please ignore this email. Your password won't change until you access the link above and create a new one.
                        <br> 
                        Thanks,  <br> 
                        Team DeliveryCog <p/>`;
        const data = {
            email: email,
            first_name: user.first_name,
            code: user.verification_code,
            subject: 'Resetting your DeliveryCog password',
            message,
        };
        sendForgotPassword(data);

        return res.status(200).json(
            response({
                message: 'Password reset code sent',
            })
        );
    }
    public async resetPassword(
        res: Response,
        password: string | number,
        confirm_password: string | number,
        code: string,
        email: string
    ) {
        const newPassword =
            password === confirm_password
                ? password
                : res.status(400).json(
                      response({
                          error: "password doesn't match",
                          message:
                              'Ensure password is same with comfirm_password',
                          success: false,
                      })
                  );
        const userExist = globalQuery.exist({
            model: 'users',
            table: 'email',
            value: email,
        });
        if (!userExist) {
            return res.status(404).json(
                response({
                    error: 'User not found',
                    message: `User with email ${email} not found`,
                    success: false,
                })
            );
        }
        const confirmCode = globalQuery.exist({
            model: 'users',
            table: 'verification_code',
            value: code,
        });
        if (!confirmCode) {
            return res.status(400).json(
                response({
                    error: 'Invalid code',
                    message: 'Please provide a valide code',
                    success: false,
                })
            );
        }
        const user: User = await globalQuery.updateOne({
            model: 'users',
            table: 'password_digest',
            value: await new Encryption().bcrypt(String(password)),
            uniqueColumn: 'email',
            uniqueValue: email,
        });
        await globalQuery.updateOne({
            model: 'users',
            table: 'verification_code',
            value: crypto.randomInt(100000, 1000000),
            uniqueColumn: 'email',
            uniqueValue: email,
        });
        if (!user) {
            return res.status(500).json(
                response({
                    error: 'Error updating password',
                    message: `Password for user with email ${email} not updated`,
                    success: false,
                })
            );
        }
        const message = `<p>
                        Hi ${user.first_name}, <br> 
                        You have successfully reset your password.
                          <br> 
                        Team DeliveryCog <p/>`;
        const data = {
            email: email,
            first_name: user.first_name,
            subject: 'Password Reset Successfully',
            message,
        };
        sendResetSuccess(data);
        return res.status(200).json(
            response({
                message: 'Password successfully reset',
            })
        );
    }
}
