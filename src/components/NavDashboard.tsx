"use client"

import { getSession, signOut, useSession } from "next-auth/react";
import Link from "next/link";

const NavDashboard = () => {
    const {data:session,status} = useSession();

    return (
        <div className="m-5">
            <h1>Hi {session?.user.user_name} I hope you're grate!</h1>
            <nav>
                <ul className="flex flex-col">
                    <Link className="my-3" href="/dashboard">Home</Link>
                    <Link className="mb-3" href="/dashboard/create">Create Task</Link>
                    <button onClick={() => signOut()} className="text-start w-auto">Sign out</button>
                </ul>
            </nav>
        </div>

    )
}

export default NavDashboard;