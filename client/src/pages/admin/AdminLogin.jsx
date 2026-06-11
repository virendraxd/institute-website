import React from 'react'
import { data, useNavigate } from 'react-router-dom'
import { useState } from 'react'

function AdminLogin() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username,
                        password,
                    }),
                }
            );

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message);
            }

            localStorage.setItem("token", data.token);

            navigate("/admin/leads");
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <>
            <section className=" flex flex-col items-center justify-center">

                <h1 className="text-6xl text-center">Admin Login</h1>

                <div className="flex flex-col justify-between items-center mt-4 w-110 h-76 border-2 rounded-2xl bg-gray-700 px-8 py-12">

                    <div className="space-y-6">

                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="border-2 rounded-lg px-4 py-2 bg-gray-600 border-gray-500 text-white w-full"
                        />

                        <input
                            type="text"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="border-2 rounded-lg px-4 py-2 bg-gray-600 border-gray-500 text-white w-full"
                        />
                    </div>

                    <button
                        onClick={handleLogin} className="border-2 rounded-lg px-4 py-2 bg-gray-600 border-gray-500 text-white w-full"
                        className="border-2 rounded-lg px-4 py-2 bg-gray-800 border-gray-500 text-white w-fit cursor-pointer"
                    >
                        Log in
                    </button>
                </div>
            </section>
        </>
    )
}

export default AdminLogin;