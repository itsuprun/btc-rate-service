import path from "path";
import dotenv from "dotenv";
const nodemailer = require('nodemailer');

dotenv.config({path: path.resolve(__dirname, "smtp_config.env")});

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 587,
    auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD
    }
});

transporter.verify().then(console.log).catch(console.error);

export async function sendEmail(subject: string, message: string, to: string) {

    const mailConfig = {
        from: process.env.SMTP_USERNAME,
        to: to,
        subject: subject,
        text: message
    };

    const result = await transporter.sendMail(mailConfig);
}
