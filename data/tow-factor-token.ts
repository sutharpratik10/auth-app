import { db } from "@/lib/db";

export const getTowFactorTokenbyToken = async (token: string) => {
    try {
        const towFactorToken = await db.twoFactorToken.findUnique({
            where: {
                token: token
            }
        });
        return towFactorToken;
    } 
    catch (error) {
        return null;
    }
};

export const getTowFactorTokenbyEmail = async (email: string) => {
    try {
        const towFactorToken = await db.twoFactorToken.findFirst({
            where: {
                token: email
            }
        });
        return towFactorToken;
    } 
    catch (error) {
        return null;
    }
};