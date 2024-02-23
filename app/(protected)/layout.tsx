import { Navbar } from "@/app/(protected)/_components/navbar";

interface ProtectedLayoutProps {
    children: React.ReactNode
}

const ProtectedLayout = ({ children }:ProtectedLayoutProps) => {
    return(
        <main className="h-full flex-col bg-gradient-to-r from-slate-900 to-slate-950 items-center justify-center">
            <Navbar/>
            {children}        
        </main>
    )
}

export default ProtectedLayout;