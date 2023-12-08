import { MAILBOX_HOST, MAILBOX_LOGIN, MAILBOX_PASSWORD } from "$env/static/private";
import nodemailer from "nodemailer";
import type SMTPTransport from "nodemailer/lib/smtp-transport";

/**
 * SMTP services :
 * - Prod: https://mail.ovh.net/roundcube 
 * - Test: https://ethereal.email
 */


/**
 * Nodemail tranporter
 * establish connection with smtp server
 */
const transporter = nodemailer.createTransport({
    host: MAILBOX_HOST,
    port: 587,
    secure: false,
    auth: {
        user: MAILBOX_LOGIN,
        pass: MAILBOX_PASSWORD
    },
    tls: {
        // disable in dev
        rejectUnauthorized: import.meta.env.PROD
    },
});

/**
 * trace email connection state
 */
transporter.verify(function (error, success) {
    if (error) {
        console.error(error);
        console.error({ MAILBOX_LOGIN, env: import.meta.env })
    } else {
        console.log(`smtp server is connected with account '${MAILBOX_LOGIN}'`);
    }
});

/**
 * Get Email options type from nodemailer transport
 */
export type Email = typeof transporter.options

export async function sendMail(data: Email) {
    return transporter.sendMail(data)
        .then((result) => {
            console.dir({ sendMail: result }, { depth: null })
        })
}