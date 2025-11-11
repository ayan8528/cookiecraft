import React, { useEffect, useState } from "react";
import { getHome, getProducts } from "../utils/api";
import ProductCard from "../components/ProductCard";

export default function Home(){
  const [home, setHome] = useState(null);
  const [products, setProducts] = useState([]);
  useEffect(()=>{ getHome().then(setHome); getProducts().then(d=>setProducts(d.items.slice(0,8))); },[]);
  if(!home) return null;

  return (
    <div>
      <section style={{maxWidth:1120, margin:"0 auto", padding:"24px 16px", display:"grid", gridTemplateColumns:"1fr 1fr", gap:16}}>
        <div>
          <h1 style={{fontSize:36, fontWeight:900, lineHeight:1.1}}>{home.heroTitle}</h1>
          <p style={{marginTop:8, color:"#6b7280"}}>{home.heroSubtitle}</p>
          <div style={{marginTop:16}}>
            <a href="/shop" style={{padding:"10px 14px", background:"#2b7a0b", color:"#fff", borderRadius:12, marginRight:8}}>{home.heroCta}</a>
            <a href="#featured" style={{padding:"10px 14px", border:"1px solid #ddd", borderRadius:12}}>Explore</a>
          </div>
        </div>
        <div style={{borderRadius:16, overflow:"hidden", border:"1px solid #eee"}}>
          <img src={home.heroImage} alt="Hero" style={{width:"100%", height:"100%", objectFit:"cover"}}/>
        </div>
      </section>

      <section id="featured" style={{maxWidth:1120, margin:"0 auto", padding:"8px 16px 24px"}}>
        <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
          <h2 style={{fontSize:24, fontWeight:800}}>Featured Products</h2>
          <a href="/shop" style={{color:"#2b7a0b"}}>View all</a>
        </div>
        <div style={{marginTop:12, display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))", gap:12}}>
          {products.map(p=><ProductCard key={p.id} p={p} />)}
        </div>
      </section>
    </div>
  );
}
