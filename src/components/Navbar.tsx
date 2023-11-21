"use client"

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link"

const Navbar = () => {
    const { data: session, status } = useSession()
    console.log(status)

    if (status == "loading") return <h1>loading</h1>

    if (status == "unauthenticated") {
        return (
            <nav className="navhome p-2 bg-black">
                <ul className="max-w-[75%] flex gap-3 justify-end mx-auto">
                    <Link href="/register" className="mx-3 border-2 border-[#444] rounded-md transition-all duration-200 p-3 hover:border-[#3bd1e5]"><h3>Register</h3></Link>
                    <button className="border-2 border-[#444] rounded-md transition-all duration-200 p-3 hover:border-[#3bd1e5]" onClick={() => signIn()}><h3>Sign in</h3></button>
                </ul>
            </nav>
        )
    }

    if (status == "authenticated") {
        return (
            <nav className="navhome p-2 bg-black">
                <ul className="w-3/4 flex gap-3 mx-auto">
                    <Link className="mx-3 border-2 border-[#444] rounded-md transition-all duration-200 p-3 hover:border-[#3bd1e5]" href="/"><h3>Home</h3></Link>
                    <button className="border-2 border-[#444] rounded-md transition-all duration-200 p-3 hover:border-[#3bd1e5]" onClick={() => signOut()}><h3>Sign out</h3></button>
                </ul>
            </nav>
        )
    }
}

export default Navbar;