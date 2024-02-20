"use server";

import {db} from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";
import { error } from "console";

export const mailVerification = async (token: string) => {
  const existnigToken = await getVerificationTokenByToken(token);

  if (!existnigToken) {
    return { error: "Token does not exist!" };
  }

  const hasExpiredToken = new Date(existnigToken.expires) < new Date();

  if (hasExpiredToken) {
    return { error: "Token has expired!" };
  }

  const existingUser = await getUserByEmail(existnigToken.email);

  if (!existingUser) {
    return { error: "Email does not exist!" };
  }

  await db.user.update({
    where: { id: existingUser.id },
    data: {
      emailVerified: new Date(),
      email: existnigToken.email,
    },
  });

  setTimeout(async () => {
    // Delete token after 5 seconds
    await db.verificationToken.delete({
      where: { id: existnigToken.id },
    });
  }, 5000);
//   await db.verificationToken.delete({
//     where: { id: existnigToken.id },
//   });

  return { success: "Email verified successfully!" };
}
