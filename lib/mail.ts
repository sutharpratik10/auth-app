import {Resend} from "resend"

//resend
const resend = new Resend (process.env.RESEND_API_KEY);

export const sendPasswordResetEmail = async (email: string, token: string) => {
    const ResetLink = `${process.env.NEXTAUTH_URL}/auth/new-password?token=${token}`;

    await resend.emails.send({
        from: 'Dev <onboarding@resend.dev>',
        to: email,
        subject: 'Reset your password',
        html:`<p>Please Reset your password by clicking on the link below</p><p><a href="${ResetLink}">Reset</a></p>`,
    });
 }

export const sendVerificationEmail = async (email: string, token: string) => {
    const confirmLink = `${process.env.NEXTAUTH_URL}/auth/mail-verification?token=${token}`;

    await resend.emails.send({
        from: 'Dev <onboarding@resend.dev>',
        to: email,
        subject: 'Confirm your mail',
        html:`<p>Please confirm your email by clicking on the link below</p><p><a href="${confirmLink}">Confirm</a></p>`,
    });
 }

 export const SendTwoFactorEmail = async (email: string, token: string) => {

    await resend.emails.send({
        from: 'Dev <onboarding@resend.dev>',
        to: email,
        subject: '2FA Code',
        html:`<p>Your two factor authentication code</p><p>${token}</p>`,
    });
 }

 