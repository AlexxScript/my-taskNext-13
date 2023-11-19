import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";

export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions);
    const prisma = new PrismaClient();
    const tasks = await prisma.task.findMany({
        where: {
            id_user: session.user.id_user
        }
    });
    console.log(session)
    return NextResponse.json(tasks)

};