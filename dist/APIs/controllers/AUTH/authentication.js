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
exports.create = void 0;
const crypto_1 = __importDefault(require("crypto"));
const mailer_1 = require("../../../services/EMAIL/mailer");
const authentication_1 = require("../../../services/AUTH/authentication");
const validation_1 = require("../validation");
const appError_1 = __importDefault(require("../../../services/ERRORS/appError"));
const authStore = new authentication_1.AuthService();
const create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const code = crypto_1.default.randomInt(100000, 1000000);
    try {
        const user = {
            first_name: req.body.firstName,
            last_name: req.body.lastName,
            password_digest: req.body.password,
            phone_number: req.body.phoneNumber,
            email: req.body.email,
            verification_code: code,
        };
        const userEmail = yield (0, validation_1.validateEmail)(user.email);
        if (userEmail) {
            return res.status(400).json({
                success: false,
                email: 'Email is already taken',
                message: 'Registration failure',
            });
        }
        const userPhone = yield (0, validation_1.validatePhoneNumber)(user.phone_number);
        if (userPhone) {
            return res.status(400).json({
                success: false,
                email: 'Phone number is already taken',
                message: 'Registration failed',
            });
        }
        if (userEmail === undefined && userPhone === undefined) {
            const registerUser = yield authStore.createUser(user);
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
                    code: registerUser[0].verification_code,
                    message,
                };
                yield (0, mailer_1.sendOTP)(userInfo);
                return res.status(200).json({
                    success: true,
                    message: 'Account successfully created, Check your mail for activation code',
                });
            }
        }
    }
    catch (error) {
        return res.send(new appError_1.default(`something went wrong ${error}`, 500));
    }
});
exports.create = create;
exports.default = exports.create;
