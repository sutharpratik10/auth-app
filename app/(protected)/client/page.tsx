"use client";

import { RoleGate } from "@/components/auth/role-gate";
import { FormSuccess } from "@/components/form-success";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { UserInfo } from "@/components/user-info";
import { useCurrentUser } from "@/hooks/use-current-user";
import { UserRole } from "@prisma/client";

const ClientPage = () => {
    const user = useCurrentUser();
    return ( 
        <>
            <Card className="w-1/2 items-center justify-center text-center">
                <CardHeader className="text-2xl font-semibold text-center">
                    📱Client Component
                </CardHeader>
                <CardContent className="space-y-4 items-center justify-center">
                    <RoleGate allowedRole={UserRole.USER || UserRole.ADMIN}>
                        <FormSuccess message="🥳You are allowed to see this content."/>
                        <UserInfo
                        lable=""
                        user={user}/>
                    </RoleGate>
                </CardContent>
            </Card>
        </>    
     );
}
 
export default ClientPage;