import { MAILBOX_LOGIN } from "$env/static/private";


export async function load() {
    return {
        contactAddress: MAILBOX_LOGIN
    }
}

export const actions = {
    default: async ({ request }) => {
        const formData = await request.formData()
        const title = formData.get('title')!.toString()
        const content = formData.get('content')!.toString()
        await new Promise(resolve => setTimeout(resolve, 1000))

        return {
            success: true
        }
    }
}