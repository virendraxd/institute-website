import React from 'react'
import { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';

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

    return (
        <>
            <header className="flex px-8 py-2 gap-4 border-b border-gray-200">
                <ul>
                    <li>
                        <Link to="/" className="hover:text-(--primary-accent)">Home</Link>
                    </li>
                </ul>

                {!isLoginPage && isAuthenticated && (
                    <>
                        <p>/</p>

                        <button onClick={handleLogout}>
                            Logout
                        </button>
                    </>
                )}
            </header>
        </>
    )
}

export default Header
