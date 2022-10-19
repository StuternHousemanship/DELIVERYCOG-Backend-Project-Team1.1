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
exports.sendOTP = void 0;
require("dotenv/config");
const nodemailer_1 = __importDefault(require("nodemailer"));
const html_to_text_1 = require("html-to-text");
const { SERVICE_NAME, GMAIL_HOST, GMAIL_USERNAME, GMAIL_PASSWORD, EMAIL_USERNAME, EMAIL_PASSWORD, EMAIL_HOST, EMAIL_FROM, } = process.env;
const sendEmail = (options) => __awaiter(void 0, void 0, void 0, function* () {
    const text = (0, html_to_text_1.htmlToText)(options.message);
    // define the email options
    const mailOptions = {
        from: EMAIL_FROM,
        to: options.email,
        subject: options.subject,
        text,
        html: options.message,
    };
    // create a transporter
    if (process.env.NODE_ENV === 'production') {
        const transporter = nodemailer_1.default.createTransport({
            service: SERVICE_NAME,
            host: GMAIL_HOST,
            auth: {
                user: GMAIL_USERNAME,
                pass: GMAIL_PASSWORD,
            },
        });
        // send the email with nodemailer
        yield transporter.sendMail(mailOptions);
    }
    else {
        const transporter = nodemailer_1.default.createTransport({
            host: EMAIL_HOST,
            port: 587,
            auth: {
                user: EMAIL_USERNAME,
                pass: EMAIL_PASSWORD,
            },
            tls: { rejectUnauthorized: false },
        });
        // send the email with nodemailer
        yield transporter.sendMail(mailOptions);
    }
});
const sendOTP = (options) => __awaiter(void 0, void 0, void 0, function* () {
    sendEmail(options);
});
exports.sendOTP = sendOTP;
