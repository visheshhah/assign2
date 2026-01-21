import ToggleButton from './components/ToggleButton'
import Navbar from './layout/Navbar'
import { useState, useEffect } from 'react';
import { ThemeContext } from './context/ThemeContext';
import DisplayProducts from './pages/DisplayProducts';

interface Product{
    id: string;
    name: string;
    stock: number;
    price: number;
    category: string;
}

interface ApiResponse{
  products: any[];
  total: number;
  skip: number;
  limit: number;
}


function App() {
  const [theme, setTheme] = useState("light");
  
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
      }
  
  return (
    <>
    <ThemeContext value={theme}>

      <Navbar handleClick={handleClick}/>
      <DisplayProducts/>
    </ThemeContext>

    
    </>
  )
}

export default App
