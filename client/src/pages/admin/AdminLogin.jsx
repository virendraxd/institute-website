import React from 'react'
import { data, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Navbar from '../../components/admin/Header'
import { toast } from "sonner";

function AdminLogin() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const isDisabled = !username || !password;

    const handleLogin = async (e) => {
        e.preventDefault();

        setLoading(true);

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username: username.trim(),
                        password,
                    }),
                }
            );

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message);
            }

            localStorage.setItem("token", data.token);
            toast.success("Welcome back!");
            navigate("/admin/leads");
        } catch (err) {
            toast.error(err.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Navbar />

            <section className="section-padding bg-(--bg-secondary) flex flex-col items-center justify-center">

                <h1 className="section-heading text-5xl sm:text-6xl text-center mb-12">Admin Login</h1>

                <div className="flex flex-col justify-between items-center sm:w-110 gap-10 sm:gap-12 border-2 rounded-2xl border-blue-950 bg-black px-6 sm:px-8 py-10 sm:py-12">

                    <form className="space-y-6"
                        onSubmit={handleLogin}>

                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            autoComplete="username"
                            maxLength={50}
                            onChange={(e) => setUsername(e.target.value)}
                            className="border rounded-lg px-4 py-2 bg-[#0A0A0A] border-gray-600 text-white w-full"
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            autoComplete="current-password"
                            maxLength={100}
                            onChange={(e) => setPassword(e.target.value)}
                            className="border rounded-lg px-4 py-2 bg-[#0A0A0A] border-gray-600 text-white w-full"
                        />

                        <button
                            disabled={loading || isDisabled}
                            type="submit"
                            className={`border-2 rounded-lg px-4 py-2 bg-(--primary-accent) border-gray-600 text-white w-full
                            ${isDisabled ? "cursor-not-allowed text-white/80" : "hover:text-white cursor-pointer"}
                            `}
                        >
                            {loading ? "Logging in..." : "Log in"}
                        </button>
                    </form >
                </div>
            </section>
        </div>
    )
}

export default AdminLogin;