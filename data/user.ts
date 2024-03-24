import { db } from "@/lib/db";

export const getUserByEmail = async function(email:string){
    try{
        const user = await db.user.findUnique({where:{email}});
        return user;
    }
    catch{
        return null;
    }
};

export const getUserById = async function(id:string){
    try{
        const user = await db.user.findUnique({where:{id}});
        return user;
    }
    catch{
        return null;
    }
};