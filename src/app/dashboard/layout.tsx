import NavDashboard from "@/components/NavDashboard";
import Navbar from "@/components/Navbar";
import SessionAuthProvider from "@/context/SessionAuthProvider";

interface InterfaceDashboard {
    children: React.ReactNode
}

const LayoutDashboard = ({ children }: InterfaceDashboard) => {
    return (
        <>
            <SessionAuthProvider>
                <div className="dashboard grid gap-2">
                    <div className="navDash [grid-area:menu] text-[var(--color-font-link)] h-screen w-[25%] fixed">
                        <NavDashboard />
                    </div>
                    <div className="[grid-area:template]">
                        {children}
                    </div>
                </div>
            </SessionAuthProvider>
        </>
    );
};

export default LayoutDashboard