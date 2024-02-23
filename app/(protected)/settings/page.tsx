"use client"

import { logout } from "@/actions/logout";
import { useCurrentUser } from "@/hooks/use-current-user";

const SettingsPage = () => {
    const onClick = () => {
        logout();
    };
    
    return(
        <div className="">

        </div>
    )
}

export default SettingsPage;