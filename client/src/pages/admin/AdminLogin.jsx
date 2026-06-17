import React from 'react'
import { data, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Navbar from '../../components/admin/Header'

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
            <Navbar />

            <section className="section-padding bg-(--bg-secondary) flex flex-col items-center justify-center">

                <h1 className="section-heading text-5xl sm:text-6xl text-center mb-12">Admin Login</h1>

                <div className="flex flex-col justify-between items-center sm:w-110 gap-10 sm:gap-12 border-2 rounded-2xl border-blue-950 bg-black px-6 sm:px-8 py-10 sm:py-12">

                    <div className="space-y-6">

                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            maxLength={50}
                            onChange={(e) => setUsername(e.target.value)}
                            className="border rounded-lg px-4 py-2 bg-[#0A0A0A] border-gray-600 text-white w-full"
                        />

                        <input
                            type="text"
                            placeholder="Password"
                            value={password}
                            maxLength={100}
                            onChange={(e) => setPassword(e.target.value)}
                            className="border rounded-lg px-4 py-2 bg-[#0A0A0A] border-gray-600 text-white w-full"
                        />
                    </div>

                    <button
                        onClick={handleLogin} className="border-2 rounded-lg px-4 py-2 bg-[#0A0A0A] border-gray-600 text-white hover:text-white/80 w-full cursor-pointer"
                    >
                        Log in
                    </button>
                </div>
            </section>
        </>
    )
}

export default AdminLogin;