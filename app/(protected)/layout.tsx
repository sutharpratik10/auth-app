import { Navbar } from "@/app/(protected)/_components/navbar";

interface ProtectedLayoutProps {
    children: React.ReactNode
}

const ProtectedLayout = ({ children }:ProtectedLayoutProps) => {
    return(
        <main className="h-full items-center justify-center flex-col bg-gradient-to-r from-slate-900 to-slate-950 ">
            <Navbar/>
            <span className="p-4"></span>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 items-center justify-center flex-col">
                {children} 
            </div> 
        </main>
    )
}

export default ProtectedLayout;