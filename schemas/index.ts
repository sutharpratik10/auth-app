import * as z from "zod"

export const LoginSchema = z.object({
    email: z.string().email({message:"Email is required"}),
    password: z.string().min(1,{
        message:"Password is required"
    })
});

export const RegisterSchema = z.object({
    name: z.string().min(1,{
        message:"name is required"
    }),
    email: z.string().email({message:"Email is required"}),
    password: z.string().min(6,{
        message:"Minimum 6 character password is required"
    })
});

export const ResetSchema = z.object({
    email: z.string().email({message:"Email is required"})
});

export const NewPasswordSchema = z.object({
    password: z.string().min(6,{
        message:"minimum 6 character password is required"
    })
});