import { db } from "@/lib/db";

export const getTwofactorConfirmationByUserId = async (userId: string) => {
    try {
        const twofactorConfirmation = await db.twoFactorConfirmation.findUnique({
            where: {
                userId: userId
            }
        });
        return twofactorConfirmation;
    }
    catch (error) {
        return null;
    }
};