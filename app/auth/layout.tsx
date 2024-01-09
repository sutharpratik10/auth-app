const AuthLayout = ({children}:{children: React.ReactNode}) => {
    return(
        <div className="h-full flex items-center justify-center bg-gradient-to-r from-slate-900 to-slate-950">{children}</div>
    );
}

export default AuthLayout;