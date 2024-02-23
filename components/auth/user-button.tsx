"use client";

import { ExitIcon } from "@radix-ui/react-icons";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useCurrentUser } from "@/hooks/use-current-user";
import { LogoutButton } from "@/components/auth/logout-button";


export const UserButton = () => {
    const user = useCurrentUser();
    const name = user?.name || '';
    const firstTwoChars = name.substring(0, 2).toUpperCase();
    return(
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar>
                    {/* <AvatarImage src={user?.image || ''}/> */}
                    <AvatarFallback className="bg-slate-900 items-center justify-center">
                        <p className="text-white font-normal text-xl">{firstTwoChars}</p>
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="" align="end">
                <LogoutButton>
                    <DropdownMenuItem className="justify-between">
                        Logout
                        <ExitIcon/>
                    </DropdownMenuItem>
                </LogoutButton>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}