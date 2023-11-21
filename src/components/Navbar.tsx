"use client"

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link"

const Navbar = () => {
    const { data:session, status } = useSession()
    console.log(status)

    if(status == "loading") return <h1>loading</h1>

    if (status == "unauthenticated") {
        return(
            <ul>
                <Link href="/dashboard">home</Link>
                <Link href="/register">Register</Link>
                <button onClick={()=>signIn()}>Sign in</button>
            </ul>
        )    
    }

    if (session?.user.role === 'ADMIN') {
        return(
            <ul>
                <h1>{session.user.user_name}</h1>
                <Link href="/dashboard">home</Link>
                <Link href="/register">Register</Link>
                <button onClick={()=>signOut()}>Sign out</button>
            </ul>
        )
    }

    if (status == "authenticated") {
        return(
            <ul>
                <Link href="/">home</Link>
                <Link href="/register">Register</Link>
                <button onClick={()=>signOut()}>Sign out</button>
            </ul>
        )
    }
}

export default Navbar;