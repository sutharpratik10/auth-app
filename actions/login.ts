"use server"

import * as z from "zod"

import { signIn } from "@/auth";
import { LoginSchema } from "@/schemas"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { getUserByEmail } from "@/data/user"
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail"

export const login = async (values: z.infer<typeof LoginSchema>)  => {
    const validatedFields = LoginSchema.safeParse(values)
    
    if(!validatedFields.success){
        return{error: "Invalid field!"};
    }
    const {email, password} = validatedFields.data;
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
