import { MAILBOX_LOGIN, MAILBOX_PASSWORD } from "$env/static/private";
import { z } from 'zod'
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: 'ssl0.ovh.net',
    port: 587,
    secure: false,
    auth: {
        user: MAILBOX_LOGIN,
        pass: MAILBOX_PASSWORD
    }
});

// verify connection configuration
transporter.verify(function (error, success) {
    if (error) {
        console.log(error);
    } else {
        console.log("server mail is connected");
    }
});

export const EmailDataSchema = z.object({
    contact: z.string().email(),
    title: z.string().min(3),
    content: z.string().min(10)
})

export type EmailData = z.infer<typeof EmailDataSchema>

export async function sendMail(data: EmailData) {
    const info = await transporter.sendMail({
        from: data.contact, // sender address
        to: MAILBOX_LOGIN, // list of receivers
        subject: data.title, // Subject line
        text: data.content, // plain text body
    });

    console.log(data)
    console.log("Message sent: %s", info.messageId);
}