import { MAILBOX_LOGIN } from '$env/static/private';
import { fail } from '@sveltejs/kit';
import { EmailDataSchema, sendTestMail } from '$lib/server/email';
import { ZodError } from 'zod';

export async function load() {
	return { contactAddress: MAILBOX_LOGIN };
}

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const contact = formData.get('contact')!.toString();
		const title = formData.get('title')!.toString();
		const content = formData.get('content')!.toString();

		try {
			const emailData = EmailDataSchema.parse({
				contact,
				title,
				content
			});
			await sendTestMail(emailData);
			await new Promise((resolve) => setTimeout(resolve, 1000));
			return {
				success: true
			};
		} catch (e) {
			if (e instanceof ZodError) {
				return fail(400, { success: false, errors: e.formErrors.fieldErrors });
			} else {
				console.dir(e, { depth: null });
				return fail(500, { success: false, message: 'Internal error' });
			}
		}
	}
};
