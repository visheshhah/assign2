import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import ToggleButton from "../components/ToggleButton";

interface NavBarProps {
 // theme: string; 
  handleClick: () => void; 
}

export default function Navbar({handleClick } : NavBarProps){
  const theme = useContext(ThemeContext);
  const classes = theme === 'light' ? "text-lg font-bold" : "text-lg font-bold text-pink-600"

  return (
    <>
      <nav className="bg-blue-600 text-white px-4 py-3 flex justify-between items-center">
        <div className={classes}>Shopie</div>
        <div><ToggleButton handleClick={handleClick}/></div>

        
      </nav>
    </>
  );
}

