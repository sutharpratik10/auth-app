"use client";

import { UserInfo } from "@/components/user-info";
import { useCurrentUser } from "@/hooks/use-current-user";

const ClientPage = () => {
    const user = useCurrentUser();
    return ( 
        <>
            <div className="justify-center flex">
                <div className="w-1/2">
                    <UserInfo
                    lable="📱Client Component"
                    user={user}/>
                </div> 
            </div>
        </>    
     );
}
 
export default ClientPage;