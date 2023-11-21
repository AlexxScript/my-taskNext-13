"use client";

import React, { useState } from "react";

const FormCreate = () => {

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
            console.log(res);
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
                    onChange={handleChangeInput}
                    value={fields.title} />
            </div>
            <div className="flex flex-col w-10/12 mx-auto my-3">
                <label className="my-2" htmlFor="description">Description task</label>
                <textarea onChange={handleChangeText} name="description" className="bg-transparent" id="" value={fields.description} />
            </div>
            <div className="flex justify-center items-center my-4">
                <input className="text-neutral-100 cursor-pointer" type="submit" value="Create task" />
            </div>
        </form>
    );
};

export default FormCreate;