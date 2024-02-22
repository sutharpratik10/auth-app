"use server"

import * as z from "zod"

import { signIn } from "@/auth";
import { LoginSchema } from "@/schemas"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { getUserByEmail } from "@/data/user"
import { getTowFactorTokenbyEmail } from "@/data/tow-factor-token";
import { generateVerificationToken, generateTowFactorToken } from "@/lib/tokens";
import { sendVerificationEmail, SendTwoFactorEmail } from "@/lib/mail"
import { db } from "@/lib/db";
import { getTwofactorConfirmationByUserId } from "@/data/two-factor-confirmation";

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
            const towFactorToken = await getTowFactorTokenbyEmail(existingUser.email);
            if(!towFactorToken || towFactorToken.token !== code){
                return {error: "Invalid Code!"}
            }
            const hasExpired = new Date() > new Date(towFactorToken.expires);

            if(hasExpired){
                return {error: "Code has expired!"}
            }

            await db.twoFactorToken.delete({
                where: { id: towFactorToken.id },
            });

            const existingConformation = await getTwofactorConfirmationByUserId(existingUser.id);

            if(existingConformation){
                await db.twoFactorConfirmation.delete({
                    where: { id: existingConformation.id },
                })
            }

            await db.twoFactorConfirmation.create({
                data:{
                    userId: existingUser.id,
                }
            })
        }
        else{
            const TwoFactorToken = await generateTowFactorToken(email);
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
