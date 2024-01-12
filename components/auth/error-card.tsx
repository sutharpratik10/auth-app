"use client";

import { CardWrapper } from "./card-wrapper";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

 export const ErrorCard = () => {
    return(
        <CardWrapper 
            headerLable={"Oops! something went wrong"} 
            backButtonLabel={"back to login"} 
            backButtonHref={"auth/login"}>
            <div className="w-full flex items-center justify-center">
                <ExclamationTriangleIcon className="text-destructive size-16"/>
            </div>
        </CardWrapper>
    )
 }