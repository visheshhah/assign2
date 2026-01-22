import React, { Children, createContext, useContext, useEffect, useState, type ReactNode } from "react";
export interface CartItem{
    id: number;
    name: string;
    stock: number;
    price: number;
    category: string;
    quantity: number;
}

interface Product{
    id: number;
    name: string;
    stock: number;
    price: number;
    category: string;
}


interface CartContextType {
    cart: CartItem[];
    addToCart: (Product: Product) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({children}:{children:ReactNode}) => {
    const [cart, setCart] = useState<CartItem[]>(() => {
        const storedCart = localStorage.getItem("cart");
        return storedCart ? JSON.parse(storedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);
    
    const addToCart = (product: Product) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find(item => item.id === product.id);
            if(existingItem){
                return prevCart.map((item) =>
                item.id === product.id ? {...item, quantity: item.quantity + 1 } : item);
            }

            return [...prevCart, { ...product, quantity: 1}]
        });
    };

    return(
        <CartContext value={{cart, addToCart}}>
            {children}
        </CartContext>
    )
}

export const useCart = () => {
    const context = useContext(CartContext);
    if(!context){
        throw new Error("useCart must be used within CartProvider")
    }
    return context;
}