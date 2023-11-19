import Navbar from "@/components/Navbar";
import SessionAuthProvider from "@/context/SessionAuthProvider";

interface InterfaceDashboard {
    children: React.ReactNode
}

const LayoutDashboard = ({ children }: InterfaceDashboard) => {
    return (
        <>
            <SessionAuthProvider>
                {children}
            </SessionAuthProvider>
        </>
    );
};

export default LayoutDashboard