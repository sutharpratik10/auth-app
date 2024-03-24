import { cn } from "@/lib/utils";
import { Aleo } from "next/font/google"
import { Children } from "react";

const font = Aleo({
  subsets:["latin"],
  weight:["600"]
});

interface HeaderProps {
    label:string;
}

export const Header = ({
    label,
}: HeaderProps) => {
    return(
        <div className="w-full flex flex-col gap-y-4 items-center justify-center">
            <h1 className={cn("text-3xl font-semibold", font.className,)}>
                🔐Auth
            </h1>
            <p className="text-muted-foreground text-sm">
                {label}
            </p>
        </div>
    )
}