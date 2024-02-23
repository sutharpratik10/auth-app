"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { UserButton } from "@/components/auth/user-button";

const Navbar = () => {
    const pathname = usePathname();
    
    return (
        <nav className="bg-white p-4 rounded-md flex justify-between">
            <div className="flex gap-x-2">
                <Button
                asChild
                variant={pathname === "/server" ? "default":"outline"}>
                    <Link href="/server">Server</Link>
                </Button>
                <Button
                asChild
                variant={pathname === "/client" ? "default":"outline"}>
                    <Link href="/client">Client</Link>
                </Button>
                <Button
                asChild
                variant={pathname === "/admin" ? "default":"outline"}>
                    <Link href="/admin">Admin</Link>
                </Button>
                <Button
                asChild
                variant={pathname === "/settings" ? "default":"outline"}>
                    <Link href="/settings">Settings</Link>
                </Button>
            </div>
            <div className="flex gap-x-2">
                <UserButton/>
            </div>
        </nav>
    )
}

export {Navbar};