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

import { useState, useEffect, use } from 'react';
import ProductCard from '../components/ProductCard';

const PRODUCTS_URL = "https://dummyjson.com/products";
const CATEGORY_LIST_URL = "https://dummyjson.com/products/category-list"

export default function DisplayProducts(){
      const [products, setProducts] = useState<Product[]>([]);
      const [categories, setCategories] = useState<string[]>([]);
      const [selectedCategory, setSelectedCategory] = useState<string>("all");

      //const [data, setData] = useState<any>();
     
       const [error, setError] = useState<string | null>(null);
       const [loading, setLoading] = useState<boolean>(true);
     
       useEffect(() => {
        const fetchCategories = async () => {
            const res = await fetch(CATEGORY_LIST_URL);
            const data: string[] = await res.json();
            setCategories(data);
        }
        fetchCategories();
       }, [])
       
       useEffect(() => {
         const fetchData = async () => {
           try {
             setLoading(true);

             const url = selectedCategory === "all" ? PRODUCTS_URL : `${PRODUCTS_URL}/category/${selectedCategory}`
     
             const response = await fetch(url);
     
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
       }, [selectedCategory]);
     
    
      return(
        <>
             <div>
                <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                    <option value="all">All</option>
                    {categories?.map((category) => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>
                <ul>
                    {products?.map(p => 
                        <li key={p.id}>
                          <ProductCard id={p.id} name={p.name} stock={p.stock} category={p.category} price={p.price}/>
                        </li>
                    )}
                 </ul>            
            </div>
        </>
      )
}