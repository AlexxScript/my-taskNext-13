import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"
import { authOptions } from "../auth/[...nextauth]/route"
import { PrismaClient } from "@prisma/client";

export async function POST(req: NextRequest) {
    try {
        const prisma = new PrismaClient();

        const session = await getServerSession(authOptions);
        const data = await req.json();

        const match = await prisma.task.findMany({
            where: {
                id_user: session.user.id_user,
                title: data.title
            }
        })

        if (match.length > 0) {
            return NextResponse.json({ message: "task exist" }, { status: 401 });
        }

        const task = await prisma.task.create({
            data: {
                id_user: session.user.id_user,
                title: data.title,
                description: data.description
            }
        });

        await prisma.$disconnect();

        return NextResponse.json(task);


    } catch (error) {
        console.log(error);
        return NextResponse.json(error);
    };
};