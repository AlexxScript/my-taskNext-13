import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import { useSession } from "next-auth/react";
import { headers } from "next/headers"
import { title } from "process";
import { table } from "console";
import Link from "next/link";
import ListTasks from "@/components/ListTasks";

interface Task {
    id_task: number;
    title: string;
    description: string;
}

async function LoadTask() {

    try {
        const headersList = headers();
        const cookie = headersList.get('cookie');
        const res = await fetch("http://localhost:3000/api/read", {
            method: "GET",
            headers: {
                'Cookie': cookie || ""
            }
        });
        return res.json();
    } catch (error) {
        console.log("error: " + error)
    }

}

export default async function Tasks() {

    const dataTasks = await LoadTask();

    return (
        <div className="">
            <ListTasks tasks={dataTasks} />
        </div>
    );
}
