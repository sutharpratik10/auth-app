"use server";

import { currentRole } from "@/lib/auth";
import { UserRole } from "@prisma/client";

export const admin = async () => {
    const role = await currentRole();

    if (role === UserRole.ADMIN) {
        return {success: "You are allowed to see this content."};
    }
    return {error: "You are not allowed to see this content."};

}