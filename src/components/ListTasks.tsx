"use client";

import { useRouter } from "next/navigation";
import CreateTaskExpress from "./CreateTaskExpress";
import NoTasks from "./NoTasks";

interface SingleTask {
    id_task: number;
    title: string;
    description: string;
}

interface TaskProps {
    tasks: SingleTask[];
}

const ListTasks = ({ tasks }: TaskProps) => {

    const router = useRouter();

    const handleButtonDelete = async (id: number) => {
        try {

            const res = await fetch(`http://localhost:3000/api/delete/${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                router.refresh();
            } else {
                console.log('Delete request failed');
            }

        } catch (error) {
            console.log(error)
        }
    }

    if (tasks.length > 0) {
        return (
            <div>
                <CreateTaskExpress />
                {
                    tasks.map((task: SingleTask) => (

                        <div key={task.id_task}
                            className="taskContainer grid max-w-3xl mx-auto my-[10px]">

                            <div className="[grid-area:title] containerTask bg-transparent border border-[#3bd1e5] rounded-md "><h3 className="m-2">{task.title}</h3></div>
                            <div className="[grid-area:description] containerTask bg-transparent border border-[#3bd1e5] rounded-md"><p className="m-2">{task.description}</p></div>

                            <a
                                className="
                                [grid-area:edit] bg-transparent flex justify-center items-center text-[#E9B44C] border border-[#E9B44C] rounded-lg
                            " href={`/dashboard/edit/${task.id_task}`}>
                                <div className="flex justify-center items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                    </svg>
                                    <p className="mx-2">Edit</p>
                                </div>
                            </a>

                            <button onClick={() => handleButtonDelete(task.id_task)}
                                className="
                                [grid-area:delete] flex justify-center items-center p-5 text-[#D64550] border border-[#D64550] bg-transparent rounded-lg
                            " >
                                <div className="flex justify-center items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                                    </svg>
                                    <p className="mx-2">Delete</p>
                                </div>
                            </button>
                        </div>
                    ))
                }
            </div>
        )
    } else {
        return (
            <div>
                <CreateTaskExpress />
                <NoTasks/>
            </div>

        )
    }
}

export default ListTasks;