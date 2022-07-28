// @ts-ignore
import path from "path";
// import nodemailer from "nodemailer";
const nodemailer = require('nodemailer');
// @ts-ignore
import dotenv from "dotenv";

dotenv.config({path: path.resolve(__dirname, "mail.env")});

console.log("===> ", process.env.SMTP_USERNAME)
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
    console.log(result)
}
