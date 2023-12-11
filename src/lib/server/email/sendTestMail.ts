import { z } from 'zod';
import { sendMail } from './nodemailer';
import { MAILBOX_LOGIN } from '$env/static/private';

export const EmailDataSchema = z.object({
	contact: z.string().email(),
	title: z.string().min(10),
	content: z.string().min(10)
});

export type EmailData = z.infer<typeof EmailDataSchema>;

export async function sendTestMail(data: EmailData) {
	await sendMail({
		from: data.contact, // sender address
		to: MAILBOX_LOGIN, // list of receivers
		subject: data.title, // Subject line
		text: data.content // plain text body
	});
}
