interface Product{
    id: number;
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

import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';

export default function DisplayProducts(){
      const [products, setProducts] = useState<Product[]>();
     
      //const [data, setData] = useState<any>();
     
       const [error, setError] = useState<string | null>(null);
       const [loading, setLoading] = useState<boolean>(true);
     
       
       useEffect(() => {
         const fetchData = async () => {
           try {
             setLoading(true);
     
             const response = await fetch("https://dummyjson.com/products");
     
             if (!response.ok) {
               throw new Error(`HTTP error! Status: ${response.status}`);
             }
     
             const result:ApiResponse = await response.json();
             
             
            const mappedProducts:Product[] = result.products.map((p) => {
               return {
                 id: p.id,
               name: p.title,
               stock: p.stock,
               price: p.price,
               category: p.category}
             }); 
     
             //console.log(mappedProducts)
             setProducts(mappedProducts);
           } catch (err) {
             setError(err instanceof Error ? err.message : "Unknown error");
           } finally {
             setLoading(false);
           }
         };
     
         fetchData();
       }, []);
     
    
      return(
        <>
             <div>
                <ul>
                    {products?.map(p => 
                        <li key={p.id}>
                          <ProductCard id={p.id} name={p.name} stock={p.stock} category={p.category} price={p.price}/>
                        </li>
                    )}
                </ul>            </div>
        </>
      )
}