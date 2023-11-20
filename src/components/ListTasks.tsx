"use client";

import { useRouter } from "next/navigation";

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

    return (
        <div>
            {
                tasks.map((task: SingleTask) => (

                    <div key={task.id_task}
                        className="taskContainer grid max-w-5xl mx-auto my-5">
                        
                        <div className="[grid-area:title] bg-[#726E97] rounded-md mx-4"><h1 className="m-2">{task.title}</h1></div>
                        <div className="[grid-area:description] bg-[#726E97] rounded-md"><p className="m-2">{task.description}</p></div>

                        <div className="[grid-area:edit] flex justify-center items-center">
                            <a className="p-5 bg-[#FDCA40] text-neutral-950 rounded-lg" href="/dashboard/update">
                                <div className="flex justify-center items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                    </svg>
                                    <p className="mx-2">Edit</p>
                                </div>
                            </a>
                        </div>

                        <div className="[grid-area:delete] flex justify-center items-center">
                            <button onClick={() => handleButtonDelete(task.id_task)} className="text-neutral-950 p-5 bg-[#D64550] rounded-lg" >
                                <div className="flex justify-center items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                                    </svg>
                                    <p className="mx-2">Delete</p>
                                </div>
                            </button>
                        </div>


                    </div>
                ))
            }
        </div>
    )

}

export default ListTasks;