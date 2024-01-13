"use server"

import bcrypt from "bcryptjs"
import * as z from "zod"
import {db} from "@/lib/db"
import { RegisterSchema } from "@/schemas"
import { getUserByEmail } from "@/data/user"
import { generateVerificationToken } from "@/lib/tokens"

export const register = async (values: z.infer<typeof RegisterSchema>)  => {
    const validatedFields = RegisterSchema.safeParse(values)

    if(!validatedFields.success){
        return{error: "Invalid field!"};
    }

    const { email, password, name } = validatedFields.data;
    const hashedpassword = await bcrypt.hash(password, 10)

    const existingUser = await getUserByEmail(email);

    if(existingUser){
        return{error: "Account is already registered with this email."}
    }
    await db.user.create({
        data:{
            name,
            email,
            password: hashedpassword,
        }
    });
    //Send verification token email.
    const verificationToken = await generateVerificationToken(email);

    return {success: "the confirmation mail sent!"};
};