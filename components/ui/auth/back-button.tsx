"use client";

import { Button } from "@/components/ui/button";
import { link } from "fs";
import Link from "next/link";

interface BackButtonProps{
    href: string;
    label: string;
}

 export const BackButton = ({href, label,}: BackButtonProps) => {
    return(
        <Button asChild variant={"link"} size={"lg"} className="flex items-center w-full gap-x-2">
            <Link href={href}>
                {label}
            </Link>
        </Button>
    )
 }