import { UserInfo } from "@/components/user-info";
import { currentUser } from "@/lib/auth";

const ServerPage = async() => {
    const user = await currentUser();
    return ( 
        <>
            <div className="justify-center flex">
                <div className="w-1/2">
                    <UserInfo
                    lable="💻Server Component"
                    user={user}/>
                </div> 
            </div>
        </>    
     );
}
 
export default ServerPage;