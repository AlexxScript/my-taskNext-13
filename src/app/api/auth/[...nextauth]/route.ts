import NextAuth from "next-auth"
import { PrismaClient, User } from "@prisma/client";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextResponse } from "next/server";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "email@email"
                },
                user_name: {
                    label: "Username",
                    type: "text",
                    placeholder: "user name"
                },
                password: {
                    label: "Password", type: "password"
                }
            },
            async authorize(credentials, req) {
                const prisma = new PrismaClient()
                try {
                    const user = await prisma.user.findUnique({
                        where: {
                            user_name: credentials?.user_name
                        }
                    })
                    if (!user) throw new Error("dasdasd");
                    console.log(user.password !== credentials?.password)

                    if (user.password !== credentials?.password) throw new Error("fasda");


                    return user
                } catch (error) {
                }
                await prisma.$disconnect()
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.user = user
            }
            return token
        },
        async session({ session, token }) {
            session.user = token.user as any
            return session
        }
    },
    pages: {
        signIn: "/signin"
    }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }