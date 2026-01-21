import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

interface Product{
    id: number;
    name: string;
    stock: number;
    price: number;
    category: string;
}

export default function ProductCard({ id, name, stock, price, category} : Product){
      const theme = useContext(ThemeContext);
      const classes = theme === 'light' ? "inline text-white" : "inline text-pink-600"

    return(
        <>

            <div className="relative border p-4 rounded m-4">
                {stock === 0 && (
                    <div className="absolute inset-0 bg-black/50 text-white flex items-center justify-center">
                        Out Of Stock
                    </div>
                )}

                {stock > 0 && stock < 5 && (
                    <span className="bg-orange-500 text-white px-2 rounded">
                        Limited Quantity
                    </span>
                )}

                {price > 500 && (
                    <span className="bg-purple-500 text-white px-2 rounded ml-2">
                        Premium
                    </span>
                )}

                <p><strong>Name:</strong> <div className={classes}>{name}</div></p>
                <p><strong>Price:</strong> {price}</p>
                <p><strong>Category:</strong> {category}</p>
                <p><strong>Quantity:</strong> {stock}</p>
            </div>
        </>
    )
}