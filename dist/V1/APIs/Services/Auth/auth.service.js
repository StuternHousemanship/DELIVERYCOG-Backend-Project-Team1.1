"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const dotenv_1 = __importDefault(require("dotenv"));
const appError_1 = require("../../Utilities/Errors/appError");
const User_1 = require("../../Models/User");
const response_1 = require("../../Utilities/response");
const bcrypt_1 = __importDefault(require("../../Utilities/bcrypt"));
const mailer_1 = __importDefault(require("../Email/mailer"));
const auth_repository_1 = __importDefault(require("../../Repository/auth/auth.repository"));
const validation_1 = __importDefault(require("../../Utilities/Validations/validation"));
const validation = new validation_1.default();
const authRepository = new auth_repository_1.default();
const mail = new mailer_1.default();
dotenv_1.default.config({ path: './src/V1/APIs/Config/.env' });
class AuthService {
    registerUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { firstName, lastName, password, phoneNumber, email } = req.body;
                const code = crypto_1.default.randomInt(100000, 1000000);
                const user = {
                    first_name: firstName,
                    last_name: lastName,
                    password_digest: password,
                    phone_number: phoneNumber,
                    email,
                    verification_code: code,
                };
                const userEmail = yield validation.validateEmail(user.email);
                if (userEmail) {
                    return res.status(400).json({
                        success: false,
                        error: ' Email is already taken',
                        message: 'Registration failed!',
                    });
                }
                const userPhone = yield validation.validatePhoneNumber(user.phone_number);
                if (userPhone) {
                    return res.status(400).json({
                        success: false,
                        error: 'Phone number is already taken',
                        message: 'Registration failed!',
                    });
                }
                if (userEmail === undefined && userPhone === undefined) {
                    const registerUser = yield authRepository.createUser(user);
                    if (!registerUser) {
                        return res.status(400).json({
                            success: false,
                            error: 'Unable to create user',
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
                        yield mail.sendOTP(userInfo);
                        return res.status(201).json({
                            success: true,
                            message: 'Account successfully created, Check your mail for activation code',
                        });
                    }
                }
            }
            catch (error) {
                return next(new appError_1.AppError(`something went wrong ${error}`, 500));
            }
        });
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const usercheck = yield User_1.User.query().where('email', '=', email);
                if (usercheck.length === 0) {
                    return res.status(404).json({
                        success: false,
                        error: 'Incorrect Email or password',
                        message: 'Login failed!',
                    });
                }
                if (!usercheck[0].is_verified) {
                    return res.status(422).json({
                        success: false,
                        message: 'User account is not active, Kindly activate account',
                    });
                }
                const user = yield authRepository.authenticate(email, password);
                if (user) {
                    const token = yield bcrypt_1.default.generateAccessToken(user);
                    const newDate = () => {
                        const currentdate = new Date();
                        const datetime = `Last Sync: ${currentdate.getDate()}/${currentdate.getMonth() + 1}/${currentdate.getFullYear()} @ ${currentdate.getHours()}:${currentdate.getMinutes()}:${currentdate.getSeconds()}`;
                        return datetime;
                    };
                    const message = `
            <p>Welcome to DYC Platform ${user[0].first_name}, we notice you just login your account at time: ${newDate()}
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
                    yield mail.sendLoginConfirmation(userInfo);
                    res.status(200).json((0, response_1.response)({ message: 'Login Successful', data: profile }));
                }
                else {
                    return res.status(403).json((0, response_1.response)({
                        message: 'Failed login attempt',
                        error: 'Incorrect password',
                        success: false,
                    }));
                }
            }
            catch (error) {
                return next(new appError_1.AppError(`something went wrong here is the error ${error}`, 500));
            }
        });
    }
    activateAccount(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { code } = req.body;
                const user = yield User_1.User.query().where('verification_code', '=', code);
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
                const modifyUser = yield User_1.User.query()
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
                    yield mail.sendWelcome(userInfo);
                    return res.status(201).json({
                        success: true,
                        message: 'Email verification successful',
                    });
                }
            }
            catch (error) {
                return next(new appError_1.AppError(`something went wrong here is the error ${error}`, 500));
            }
        });
    }
}
exports.default = AuthService;
