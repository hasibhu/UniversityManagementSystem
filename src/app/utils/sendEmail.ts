

import nodemailer from "nodemailer";
import config from "../config";



export const sendEmail = async(to: string, html: string) => {

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        // secure: false, // true for port 465, false for other ports
        secure: config.NODE_ENV === 'production', // true for port 465, false for other ports
        auth: {
            user: "huberlinhasib@gmail.com",
            pass: "eequ kqkb uyfh rlut",
        },
    });
    
    await transporter.sendMail({
        from: 'huberlinhasib@gmail.com', // sender address
        to, // list of receivers
        subject: "Password Reset", // Subject line
        text: "Reset your password here: ... ", // plain text body
        html, // html body
    });



}



