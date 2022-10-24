import 'dotenv/config';
import nodemailer from 'nodemailer';
import { htmlToText } from 'html-to-text';
import { Mail } from '../../Models/Mail';

const {
    SERVICE_NAME,
    GMAIL_HOST,
    GMAIL_USERNAME,
    GMAIL_PASSWORD,
    EMAIL_USERNAME,
    EMAIL_PASSWORD,
    EMAIL_HOST,
    EMAIL_FROM,
} = process.env;

class Email {
    sendEmail = async (options: Mail) => {
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
                host: EMAIL_HOST,
                port: 587,
                auth: {
                    user: EMAIL_USERNAME,
                    pass: EMAIL_PASSWORD,
                },
                tls: { rejectUnauthorized: false },
            });
            // send the email with nodemailer
            await transporter.sendMail(mailOptions);
        }
    };

    sendOTPMail = async (options: Mail) => {
        this.sendEmail(options);
    };

    welcomeMail = async (options: Mail) => {
        this.sendEmail(options);
    };

    loginConfirmationMail = async (options: Mail) => {
        this.sendEmail(options);
    };
}

export default Email;
