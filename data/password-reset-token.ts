import { db } from "@/lib/db";

export const getPasswordResetTokenByToken = async (token: string) => {
    try{
        const passwordResetToken = await db.passwordResetToken.findUnique({
            where: { token }
        });

        return passwordResetToken;
    } catch{
        return { error: "Please try again!" };
    }
};

export const getPasswordResetTokenByEmail = async (email: string) => {
    try{
        const passwordResetToken = await db.passwordResetToken.findFirst({
            where: { email }
        });

        return passwordResetToken;
    } catch{
        return { error: "Please try again!" };
    }
};