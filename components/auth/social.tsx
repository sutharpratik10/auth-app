"use client";
import { Button } from "@/components/ui/button";
import {signIn} from "next-auth/react"

import {FcGoogle} from "react-icons/fc";
import {FaGithub} from "react-icons/fa";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";


 export const Social = () => {
    const onClick = (provider: "google" | "Github") => {
        signIn(provider,{
            callbackUrl: DEFAULT_LOGIN_REDIRECT,
        });
    }
    return(
        <div className="flex items-center w-full gap-x-2">
            <Button 
                size={"lg"} 
                onClick={()=>onClick("google")} 
                variant={"default"} 
                className="flex items-center w-full gap-x-2">
                <FcGoogle/>
            </Button>
            <Button 
                size={"lg"} 
                onClick={()=>onClick("Github")} 
                variant={"default"} 
                className="flex items-center w-full gap-x-2">
                <FaGithub/> 
            </Button>
        </div>
    )
 }