import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import authConfig from "@/auth.config"
import { db } from "@/lib/db"
import { getUserById } from "@/data/user"
import { string } from "zod"
import { UserRole } from "@prisma/client"
import { getTwofactorConfirmationByUserId } from "@/data/two-factor-confirmation"

export const {
  handlers: { GET, POST },  
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages:{
    signIn:"/auth/login",
    error:"/auth/error",
  },
  events:{
    async linkAccount({user}){
      await db.user.update({
        where:{id:user.id },
        data:{emailVerified: new Date()}
      })
    }
  },
  callbacks:{
    async signIn({user, account}){

      const existingUser = await getUserById(user.id);
      
      //Allow OAuth without email verification
      if(account?.provider !== "credentials") return true;

      //prevent signin without Email verification
      if(!existingUser?.emailVerified){
        return false;
      }

      //2FA check
      if(existingUser?.isTwoFactorEnabled){
        const twofactorConfirmation = await getTwofactorConfirmationByUserId(existingUser.id);
        
        console.log("2FA:",twofactorConfirmation);

        if (!twofactorConfirmation){
          return false;
        }

        //Delete two factor confirmation for next login
        await db.twoFactorConfirmation.delete({
          where: {
            userId: twofactorConfirmation.id
          }
        });
      }

      return true;
    },

    async session ({token, session}){
     if (token.sub && session.user){
      session.user.id = token.sub;
     }
     if (token.role && session.user){
      session.user.role = token.role as UserRole;
     }
      return session;
    },
     async jwt({token}){
      if(!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if(!existingUser) return token;

      token.role = existingUser.role;
      return token;
     }
  },
    adapter: PrismaAdapter(db),
    session:{strategy: "jwt"},
    ...authConfig
})