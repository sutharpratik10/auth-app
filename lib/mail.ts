import {Resend} from "resend"

const resend = new Resend (process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
    const confirmLink = `${process.env.NEXTAUTH_URL}/auth/new-verification?token=${token}`;

    await resend.emails.send({
        from: 'Pratik <onboarding@resend.dev>',
        to: email,
        subject: 'Confirm your mail',
        html:`<p>Please confirm your email by clicking on the link below</p><p><a href="${confirmLink}">Confirm</a></p>`,
    });
 }