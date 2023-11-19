import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";

export async function GET(req: NextRequest, { params }: { params: { id_task: number } }) {
    const prisma = new PrismaClient();

    try {
        const session = await getServerSession(authOptions);
        const idTask = params.id_task;

        const idTaskParse = Number(idTask)

        const select = await prisma.task.findUnique({
            where: {
                id_task: idTaskParse,
                id_user: session.user.id_user
            }
        });


        if (!select) {
            return NextResponse.json({ error: 'Not found' }, { status: 404 })
        }

        return NextResponse.json(select);
    } catch (error) {
        console.log(error);
        return NextResponse.json(error)
    } finally {
        await prisma.$disconnect();
    }
}