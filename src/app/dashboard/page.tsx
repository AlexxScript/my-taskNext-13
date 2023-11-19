import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import { useSession } from "next-auth/react";
import { headers } from "next/headers"
import { title } from "process";
import { table } from "console";

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
                'Cookie': cookie
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
        <div>
            {
                dataTasks.map((task: Task) => (

                    <div key={task.id_task}
                        className="taskContainer grid max-w-5xl mx-auto my-5">
                        <h1 className="[grid-area:title]">{task.title}</h1>
                        <p className="[grid-area:description] ">{task.description}</p>

                        <div className="[grid-area:delete] flex justify-center items-center">
                            <a className="p-5 bg-red-500 rounded-lg" href="/dashboard/delete">
                                <div className="flex justify-center items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                                    </svg>
                                    <p>Delete</p>
                                </div>
                            </a>
                        </div>

                        <div className="[grid-area:update] flex justify-center items-center">
                            <a className="p-5 bg-green-500 rounded-lg" href="/dashboard/update">
                                <div className="flex justify-center items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                    </svg>
                                    <p>Edit</p>
                                </div>
                            </a>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}
