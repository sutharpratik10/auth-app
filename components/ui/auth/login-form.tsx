import { CardWrapper } from "./card-wrapper"

export const LoginForm = () => {
    return (
       <>
       <CardWrapper 
       headerLable="Welcome back"
       backButtonLabel="Don't have an account?"
       backButtonHref="/auth/register"
       showSocial>
        Login Here!
       </CardWrapper>
       </>
    )
}