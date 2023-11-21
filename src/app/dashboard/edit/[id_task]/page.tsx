import FormEdit from "@/components/FormEdit";
import { headers } from "next/headers";

const loadTask = async (idTask: string) => {
    const headerList = headers();
    const cookie = headerList.get('cookie');
    const res = await fetch(`http://localhost:3000/api/read/${idTask}`, {
        method: "GET",
        headers: {
            "Cookie": cookie || ""
        }
    });
    return res.json();
}

const updatePage = async ({ params }: { params: { id_task: string } }) => {
    const task = await loadTask(params.id_task);
    console.log(task)
    return (
        <div className=" flex flex-col justify-center max-w-xl h-96 mt-9 mx-auto border-solid border-2
        rounded-lg border-stone-300
        ">
            <FormEdit props={task}/>
        </div>
    );
};

export default updatePage