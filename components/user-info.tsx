import { ExtendedUser } from "@/next-auth";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface userInfoProps{
    user?:ExtendedUser;
    lable:string;
};

export const UserInfo = ({
    user,
    lable
}:userInfoProps) => {
    return(
        <Card className="items-center justify-center">
            <CardHeader>
                <p className="text-2xl font-semibold text-center">{lable}</p>
            </CardHeader>
            <CardContent className="items-center justify-center">
                <div className="flex flex-row items-center justify-between rounded-lg border p-3 my-1 shadow-sm">
                    <p className="text-sm font-medium text-center">
                        ID:
                    </p>
                    <p className="text-sm font-medium text-center">
                        {user?.id}
                    </p>
                </div>
                <div className="flex flex-row items-center justify-between rounded-lg border p-3 my-1 shadow-sm">
                    <p className="text-sm font-medium text-center">
                        Name:
                    </p>
                    <p className="text-sm font-medium text-center">
                        {user?.name}
                    </p>
                </div>
                <div className="flex flex-row items-center justify-between rounded-lg border p-3 my-1 shadow-sm">
                    <p className="text-sm font-medium text-center">
                        Email:
                    </p>
                    <p className="text-sm font-medium text-center">
                        {user?.email}
                    </p>
                </div>
                <div className="flex flex-row items-center justify-between rounded-lg border p-3 my-1 shadow-sm">
                    <p className="text-sm font-medium text-center">
                        Role:
                    </p>
                    <p className="text-sm font-medium text-center">
                        {user?.role}
                    </p>
                </div>
                <div className="flex flex-row items-center justify-between rounded-lg border p-3 my-1 shadow-sm">
                    <p className="text-sm font-medium text-center">
                        2FA Enabled:
                    </p>
                    <Badge variant={user?.isTwoFactorEnabled ? "success":"destructive"} className="text-sm font-medium text-center">
                        {user?.isTwoFactorEnabled? "Yes":"No"}
                    </Badge>
                </div>
            </CardContent>
        </Card>
    )
}