import React, { useEffect, useState } from "react";
import { wishlist } from "../store/cart";
import { getProducts } from "../utils/api";
import ProductCard from "../components/ProductCard";

export default function Wishlist(){
  const [ids,setIds]=useState(wishlist.get());
  const [products,setProducts]=useState([]);
  useEffect(()=>{ getProducts().then(d=>setProducts(d.items.filter(p=>ids.includes(p.id)))); },[ids]);
  return (
    <div style={{maxWidth:1120, margin:"0 auto", padding:"24px 16px"}}>
      <h1 style={{fontSize:24, fontWeight:800, marginBottom:8}}>Wishlist</h1>
      {products.length===0 ? <div>No items in wishlist.</div> :
        <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))", gap:12}}>
          {products.map(p=><ProductCard key={p.id} p={p}/>)}
        </div>
      }
    </div>
  );
}
