import React from 'react'
import { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useTheme } from "../ThemeProvider";

function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const isLoginPage = location.pathname === "/admin";

    const [isAuthenticated, setIsAuthenticated] = useState(
        !!localStorage.getItem("token")
    );

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        navigate("/admin");
    };

    const { darkMode, toggleTheme } = useTheme();

    return (
        <>
            <header className="flex px-4 sm:px-8 py-2 border-b border-gray-200 justify-between">
                <div className="flex flex-row gap-4">
                    <ul>
                        <li>
                            <Link to="/" className="font-semibold hover:text-(--brand-secondary) hover:text-shadow-sm" >Home</Link>
                        </li>
                    </ul>

                    {!isLoginPage && isAuthenticated && (
                        <>
                            <p>/</p>

                            <button
                                onClick={handleLogout}
                                className="font-semibold hover:text-red-700 hover:text-shadow-sm cursor-pointer"
                            >
                                Logout
                            </button>
                        </>
                    )}

                </div>

                <button onClick={toggleTheme}>
                    {darkMode ? "☀️" : "🌙"}
                </button>
            </header>
        </>
    )
}

export default Header
