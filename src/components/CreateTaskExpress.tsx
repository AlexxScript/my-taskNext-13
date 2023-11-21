"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const CreateTaskExpress = () => {

    const router = useRouter();

    const [fields, setFields] = useState({
        title: "",
        description: ""
    })

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
        setFields({
            ...fields,
            [e.target.name]: e.target.value
        });
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
            const data = await fetch("http://localhost:3000/api/create", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(fields)
            });
            const res = await data.json();

            setFields({
                title: "",
                description: ""
            });
            router.refresh();

            console.log(res);
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <form onSubmit={handleSubmit}
            className="taskContainerForm grid max-w-3xl mx-auto my-[10px]">

            <div >
                <input type="text"
                    value={fields.title}
                    onChange={handleChangeInput}
                    name="title"
                    className="[grid-area:title] bg-transparent border-2 border-[#867E96] rounded-md w-[100%] h-[100%]"
                    placeholder="Insert title" />
            </div>
            <div >
                <textarea
                    onChange={handleChangeText}
                    value={fields.description}
                    name="description"
                    className="[grid-area:description] bg-transparent border-2 border-[867E96] rounded-md w-[100%]"
                    placeholder="Write a description"
                />
            </div>

            <button type="submit" className="
                [grid-area:create] bg-transparent flex justify-center items-center text-[#32965D] border-2 border-[#32965D] rounded-lg
            " >
                <div className="flex justify-center items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-square" viewBox="0 0 16 16">
                        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                    </svg>
                    <p className="mx-2">Create</p>
                </div>
            </button>
        </form>
    );
};

export default CreateTaskExpress;