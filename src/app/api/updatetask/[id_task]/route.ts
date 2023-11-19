import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";

export async function POST(req: NextRequest, { params }: { params: { id_task: number } }) {
    const prisma = new PrismaClient();
    try {
        const session = await getServerSession(authOptions);
        const idTask = Number(params.id_task);
        const dataUpdate = await req.json();

        const updateTask = await prisma.task.update({
            where: {
                id_task: idTask,
                id_user: session.user.id_user
            },
            data: {
                title: dataUpdate.title,
                description: dataUpdate.description
            }
        });

        if (!updateTask) {
            return NextResponse.json({ error: 'Not found' }, { status: 404 })
        }

        return NextResponse.json(updateTask);
    } catch (error) {
        console.log(error);
        return NextResponse.json(error)
    } finally {
        await prisma.$disconnect();
    }
}