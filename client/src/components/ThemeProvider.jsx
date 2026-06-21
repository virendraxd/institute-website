import { createContext, useContext, useState, useEffect } from "react"

const ThemeContext = createContext();

function ThemeProvider({ children }) {
    const [darkMode, setDarkMode] = useState(
        localStorage.getItem("admin-theme") === "admin-dark"
    );

    useEffect(() => {
        localStorage.setItem(
            "admin-theme",
            darkMode ? "admin-dark" : ""
        );
    }, [darkMode]);

    const toggleTheme = () => {
        setDarkMode(prev => !prev);
    }

    return (
        <ThemeContext.Provider
            value={{ darkMode, toggleTheme }}
        >
            <div className={darkMode ? "admin-dark" : ""}>
                {children}
            </div>
        </ThemeContext.Provider>
    )
}

export default ThemeProvider;

export const useTheme = () => useContext(ThemeContext);