import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import ToggleButton from "../components/ToggleButton";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";

interface NavBarProps {
 // theme: string; 
  handleClick: () => void; 
}

export default function Navbar({handleClick } : NavBarProps){
  const theme = useContext(ThemeContext);
  const classes = theme === 'light' ? "text-lg font-bold" : "text-lg font-bold text-pink-600";
  const {cart} = useCart();

  const totalQuantity = cart.reduce((total ,item) => total + item.quantity, 0);

  return (
    <>
      <nav className="bg-blue-600 text-white px-4 py-3 flex justify-between items-center">
        <div className={classes}>Shopie</div>
        <div><ToggleButton handleClick={handleClick}/></div>
        <div className="relative">
          <ShoppingCart/>

          {totalQuantity > 0 && (
            <span className="absolute -top-1.5 -right-1.5 px-1.5 bg-red-500 text-white text-xs rounded-full">
              {totalQuantity}
            </span>
          )}
        </div>
        
      </nav>
    </>
  );
}

