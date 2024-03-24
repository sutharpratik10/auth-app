/* 
This is used for anything on client-side.
*/

import { useSession } from "next-auth/react";

export const useCurrentUser = () => {
    const session = useSession();
    return session.data?.user;
}