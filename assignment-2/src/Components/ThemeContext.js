import { createContext, useState } from "react";

export const ThemeContext = createContext({})

export const AppProvider = ({ children }) => {
    const [theme, setTheme] = useState("lightTheme")

    const handleTheme = () => {
        setTheme(theme === "lightTheme" ? "darkTheme" : "lightTheme")
    }


    return <ThemeContext.Provider value={{ theme, handleTheme }}>
        {children}
    </ThemeContext.Provider>
}