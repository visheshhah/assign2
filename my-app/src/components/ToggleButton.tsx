import { useEffect, useState, useContext } from "react"
import { ThemeContext } from "../context/ThemeContext";

interface ToggleProps {
  //theme: string; 
  handleClick: () => void; 
}

export default function ToggleButton({handleClick } : ToggleProps){
      const theme = useContext(ThemeContext);
    
    /* const [theme, setTheme] = useState("light");

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) {
        setTheme(savedTheme);
    }
    }, [])

    function handleClick(){
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme)
    } */
    return(
        <>
            <button
            onClick={handleClick}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 "
            >
            {theme === "light" ? "🌞" : "🌙"} 
            </button>
        </>
    )
}