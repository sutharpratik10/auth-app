"use client"

import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Header } from "@/components/ui/auth/header";
import { Social } from "@/components/ui/auth/social";
import { BackButton } from "@/components/ui/auth/back-button";

interface CardWrapperProps {
    children:React.ReactNode;
    headerLable:string;
    backButtonLabel: string;
    backButtonHref:string; 
    showSocial?: boolean;
}; 

export const CardWrapper = ({
    children,
    headerLable,
    backButtonLabel,
    backButtonHref, 
    showSocial
}: CardWrapperProps) => {
    return(
       <Card className="w-[400px] shadow-md">
            <CardHeader>
                <Header label={headerLable}/>
            </CardHeader>
            <CardContent>{children}</CardContent>
            {showSocial && (
                <CardFooter>
                    <Social/>
                </CardFooter>
            )}
            <CardFooter>
                <BackButton
                    label={backButtonLabel}
                    href={backButtonHref}
                />
            </CardFooter>
       </Card>
    )
}