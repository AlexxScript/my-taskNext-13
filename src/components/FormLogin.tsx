"use client"
import { signIn } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/navigation"

const FormLogin = () => {
    const router = useRouter()
    const [fields, setFields] = useState({
        email: "",
        user_name: "",
        password: "",
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFields({
            ...fields,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            const res = await signIn("credentials", {
                email: fields.email,
                user_name: fields.user_name,
                password: fields.password,
                redirect: false
            });

            setFields({
                email: "",
                user_name: "",
                password: "",
            })

            if (res?.error) {
                throw new Error("Error frontend");
            };

            router.push("/");
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col w-10/12 mx-auto my-3">
                    <label className="my-3" htmlFor="email">Email</label>
                    <input
                        className="bg-transparent p-1 rounded-sm border-2 border-solid focus:border-sky-500"
                        type="email"
                        name="email"
                        placeholder="Email"
                        required
                        onChange={handleChange}
                        value={fields.email}
                    />
                </div>
                <div className="flex flex-col w-10/12 mx-auto my-3">
                    <label className="my-3" htmlFor="user_name">User name</label>
                    <input
                        className="bg-transparent p-1 rounded-sm border-2 border-solid focus:border-sky-500"
                        type="text"
                        name="user_name"
                        placeholder="User Name"
                        required
                        onChange={handleChange}
                        value={fields.user_name}
                    />
                </div>
                <div className="flex flex-col w-10/12 mx-auto my-3">
                    <label className="my-3" htmlFor="password">User password</label>
                    <input
                        className="bg-transparent p-1 rounded-sm border-2 border-solid focus:border-sky-500"
                        type="password"
                        name="password"
                        placeholder="Write here your password"
                        required
                        onChange={handleChange}
                        value={fields.password}
                    />
                </div>
                <div className="flex flex-col w-10/12 mx-auto my-3">
                    <input className="text-neutral-100 cursor-pointer" type="submit" value="enviar" />
                </div>
            </form>
        </div>
    )
}

export default FormLogin;