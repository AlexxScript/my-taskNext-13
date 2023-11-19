import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function GET(req: Request) {
    try {
        const prisma = new PrismaClient()
        const user = await prisma.user.findMany()
        await prisma.$disconnect()
        console.log(user)
        return NextResponse.json(user)
    } catch (error) {
        console.log(error)
    }
}

export async function POST(req: NextRequest) {
    const prisma = new PrismaClient()

    try {
        const userJson = await req.json();
        const userUnique = await prisma.user.findUnique({
            where: {
                email: userJson.email,
                user_name: userJson.user_name,
            }
        })

        if (userUnique) {
            console.log(userUnique)
            return NextResponse.json({ message: "User exist" }, { status: 401 })
        }

        if (userJson.password !== userJson.repeatPassword) {
            return NextResponse.json({ message: "Password does not match" }, { status: 400 })
        }

        const user = await prisma.user.create({
            data: {
                email: userJson.email,
                password: userJson.password,
                role: "ADMIN",
                user_name: userJson.user_name,
            }
        })
        await prisma.$disconnect()

        return NextResponse.json(user)

    } catch (error) {
        console.log(error)
        return NextResponse.json(error)
    }

}

