import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import { htmlToText } from 'html-to-text';
import { Mail } from '../../Models/Mail';

dotenv.config({ path: './src/V1/APIs/Config/.env' });

const {
    SERVICE_NAME,
    GMAIL_HOST,
    GMAIL_USERNAME,
    GMAIL_PASSWORD,
    EMAIL_USERNAME,
    EMAIL_PASSWORD,
    EMAIL_HOST,
    EMAIL_PORT,
    EMAIL_FROM,
} = process.env;

export default class Email {
    async sendEmail(options: Mail) {
        const text = htmlToText(options.message);

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
            const transporter = nodemailer.createTransport({
                service: SERVICE_NAME,
                host: GMAIL_HOST,
                auth: {
                    user: GMAIL_USERNAME,
                    pass: GMAIL_PASSWORD,
                },
            });

            // send the email with nodemailer
            await transporter.sendMail(mailOptions);
        } else {
            const transporter = nodemailer.createTransport({
                host: EMAIL_HOST as string,
                port: Number(EMAIL_PORT),
                auth: {
                    user: EMAIL_USERNAME,
                    pass: EMAIL_PASSWORD,
                },
                tls: { rejectUnauthorized: false },
            });
            // send the email with nodemailer
            await transporter.sendMail(mailOptions);
        }
    }

    async sendOTP(options: Mail) {
        await this.sendEmail(options);
    }

    async sendWelcome(options: Mail) {
        await this.sendEmail(options);
    }

    async sendForgotPassword(options: Mail) {
        await this.sendEmail(options);
    }
    async sendResetSuccess(options: Mail) {
        await this.sendEmail(options);
    }
    async sendLoginConfirmation(options: Mail) {
        await this.sendEmail(options);
    }
}
