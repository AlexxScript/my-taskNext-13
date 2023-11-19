"use client"

import React, { useState } from "react"

const FormRegister = () => {

    const [fields,setFields] = useState({
        email:"",
        user_name:"",
        password:"",
        repeatPassword:""
    })

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setFields({
            ...fields,
            [e.target.name]:e.target.value
        })
    }

    const handleSubmit = async (e:React.SyntheticEvent<HTMLFormElement>)=>{
        e.preventDefault()
        try {
            const res = await fetch("http://localhost:3000/api/register",{
                method:"POST",
                headers:{
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(fields)
            })
            const data = await res.json()
            console.log(data)
            setFields({
                email:"",
                user_name:"",
                password:"",
                repeatPassword:""
            })
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col">
                    <label className="my-3" htmlFor="email">Email</label>
                    <input 
                        className="p-1 rounded-sm border-2 border-solid focus:border-sky-500" 
                        type="email"
                        name="email"
                        placeholder="Email" 
                        required
                        onChange={handleChange}
                        value={fields.email}
                    />
                </div>
                <div className="flex flex-col">
                    <label className="my-3" htmlFor="user_name">User name</label>
                    <input 
                        className="p-1 rounded-sm border-2 border-solid focus:border-sky-500" 
                        type="text"
                        name="user_name"
                        placeholder="User Name" 
                        required
                        onChange={handleChange}
                        value={fields.user_name}
                    />
                </div>
                <div className="flex flex-col">
                    <label className="my-3" htmlFor="password">User password</label>
                    <input
                        className="p-1 rounded-sm border-2 border-solid focus:border-sky-500" 
                        type="password" 
                        name="password" 
                        placeholder="Write here your password"
                        required
                        onChange={handleChange}
                        value={fields.password}
                    />    
                </div>
                <div className="flex flex-col">
                    <label className="my-3" htmlFor="repeatPassword">Confirm your password</label>
                    <input 
                        className="p-1 rounded-sm border-2 border-solid focus:border-sky-500"
                        type="password" 
                        name="repeatPassword" 
                        placeholder="Write your password again" 
                        required
                        onChange={handleChange}
                        value={fields.repeatPassword}
                    />
                </div>
                <div className="flex flex-col">
                    <input type="submit" value="enviar" />
                </div>
            </form>
        </div>
    )
}

export default FormRegister