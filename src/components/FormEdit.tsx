"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";

interface EditTask {
    id_task: string;
    title: string;
    description: string;
}

interface TaskProp {
    props: EditTask;
}

const FormEdit = ({ props }: TaskProp) => {

    const router = useRouter()

    const [fields, setFields] = useState({
        title: props.title,
        description: props.description
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFields({
            ...fields,
            [e.target.name]: e.target.value
        })
    }

    const handleChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        console.log(e.target.value);
        setFields({
            ...fields,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const res = await fetch(`http://localhost:3000/api/edit/${props.id_task}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(fields)
            });

            if(res.ok){
                router.push("/dashboard");
            }

        } catch (error) {
            console.log(error)
        }



    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col w-10/12 mx-auto my-3">
                <label className="my-2" htmlFor="titleTask">Title task</label>
                <input
                    className="bg-transparent"
                    type="text"
                    name="title"
                    onChange={handleInputChange}
                    value={fields.title}
                />
            </div>
            <div className="flex flex-col w-10/12 mx-auto my-3">
                <label className="my-2" htmlFor="description">Description task</label>
                <textarea className="bg-transparent" name="description" onChange={handleChangeText} id="" value={fields.description} />
            </div>
            <div className="flex justify-center items-center my-4">
                <input className="text-neutral-100 cursor-pointer" type="submit" value="Edit task" />
            </div>
        </form>
    )
}

export default FormEdit;