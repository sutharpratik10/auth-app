import { UserInfo } from "@/components/user-info";
import { currentUser } from "@/lib/auth";

const ServerPage = async() => {
    const user = await currentUser();
    return ( 
        <>
            <div className="justify-center w-1/2">
                <div className="w-full">
                    <UserInfo
                    lable="💻Server Component"
                    user={user}/>
                </div> 
            </div>
        </>    
     );
}
 
export default ServerPage;