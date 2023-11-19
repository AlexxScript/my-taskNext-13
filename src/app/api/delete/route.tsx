import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function DELETE(req: NextRequest) {
    const prisma = new PrismaClient();
    try {
        const data = await req.json()
        const session = await getServerSession(authOptions);
        const deleted = await prisma.task.delete({
            where: {
                id_task: data.id_task,
                id_user: session.user.id_user
            }
        });
        await prisma.$disconnect();
        return NextResponse.json({ message: "deleted", deleted })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Task does not exist" })
    }

}