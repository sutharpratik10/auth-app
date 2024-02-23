"use server"

import * as z from "zod"

import { signIn } from "@/auth";
import { LoginSchema } from "@/schemas"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { getUserByEmail } from "@/data/user"
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import { generateVerificationToken, generateTwoFactorToken } from "@/lib/tokens";
import { sendVerificationEmail, SendTwoFactorEmail } from "@/lib/mail"
import { db } from "@/lib/db";
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";

export const login = async (values: z.infer<typeof LoginSchema>)  => {
    const validatedFields = LoginSchema.safeParse(values)
    
    if(!validatedFields.success){
        return{error: "Invalid field!"};
    }
    const {email, password, code} = validatedFields.data;
    const existingUser = await getUserByEmail(email);

     // Check if the user does not exist
    if (!existingUser) {
        return { error: "Account is not registered." };
    }
    
    // Check if the email is not verified
    if(!existingUser.emailVerified){
        const verificationToken = await generateVerificationToken(email);
        await sendVerificationEmail(verificationToken.email, verificationToken.token);
        return {success:"Confirmation email Sent!"};
    }

    //check if user enabled 2FA
    if (existingUser.isTwoFactorEnabled && existingUser.email){
        if(code){
            const TwoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);
            if(!TwoFactorToken || TwoFactorToken.token !== code){
                return {error: "Invalid Code!"}
            }
            const hasExpired = new Date() > new Date(TwoFactorToken.expires);

            if(hasExpired){
                return {error: "Code has expired!"}
            }

            await db.twoFactorToken.delete({
                where: { id: TwoFactorToken.id },
            });

            const existingConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);

            if(existingConfirmation){
                await db.twoFactorConfirmation.delete({
                    where: { id: existingConfirmation.id },
                })
            }

            await db.twoFactorConfirmation.create({
                data:{
                    userId: existingUser.id,
                }
            })
        }
        else{
            const TwoFactorToken = await generateTwoFactorToken(email);
            await SendTwoFactorEmail(TwoFactorToken.email, TwoFactorToken.token);
        
            return { twoFactor: true }
        }
    };

    try{
        await signIn("credentials", {
            email, 
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT,
            })
    }
    catch(error){
        if(error instanceof AuthError){
            switch (error.type){
                case "CredentialsSignin" : 
                    return {error: "Invalid Credentials"}
                default: 
                    return{error:"Something went wrong!"}          
            }
        }
        throw error;
    }
};
