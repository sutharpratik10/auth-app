"use client";

import { admin } from "@/actions/admin";
import { RoleGate } from "@/components/auth/role-gate";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { UserRole } from "@prisma/client";
import { toast } from "sonner";

const AdminPage = () => {
    const onApiRouteClick = () => {
        fetch("/api/admin")
        .then ((response) => {
            if (response.ok) {
                toast.success("🥳You are allowed to see this server action /api/admin")
            }else{
                toast.error("🥺 You are not allowed to see this server action /api/admin!");
            }
        })
    }
    const onServerActionClick = () => {
        admin().then((data) => {
            if (data.success) {
                toast.success("🥳You are allowed to see this server action content.")
            }else{
                toast.error("🥺You are not allowed to see this server action content.")
            }
        })
    }
    return ( 
        <Card className="w-1/2 items-center justify-center text-center">
            <CardHeader className="text-2xl font-semibold text-center">
                🔑Admin
            </CardHeader>
            <CardContent className="space-y-4 items-center justify-center">
                <RoleGate allowedRole={UserRole.ADMIN}>
                    <FormSuccess message="🥳You are allowed to see this content."/>
                </RoleGate>
                
                <div className="flex flex-row items-center justify-between rounded-lg border p-3 my-1 shadow-sm">
                    <p className="text-sm font-medium">
                        Admin-only API Route
                    </p>
                    <Button onClick={onApiRouteClick}>
                        Click to test
                    </Button>
                </div>

                <div className="flex flex-row items-center justify-between rounded-lg border p-3 my-1 shadow-sm">
                    <p className="text-sm font-medium">
                        Admin-only Server Action
                    </p>
                    <Button onClick={onServerActionClick}>
                        Click to test
                    </Button>
                </div>

            </CardContent>
        </Card>
     );
}
 
export default AdminPage;