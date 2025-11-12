import React, { useEffect, useState } from "react";
import { getHome, getProducts } from "../utils/api";
import ProductCard from "../components/ProductCard";

export default function Home(){
  const [home,setHome]=useState(null);
  const [products,setProducts]=useState([]);
  const [settings,setSettings]=useState(null);

  useEffect(()=>{ getHome().then(setHome); getProducts().then(d=>setProducts(d.items.filter(p=>!p.hidden).slice(0,8))); fetch("/data/settings.json").then(r=>r.json()).then(setSettings); },[]);

  if(!home) return null;

  return (
    <div>
      <section style={{width:"100%", background: "linear-gradient(90deg, #fffaf2 0%, #fff6e6 100%)", padding:"48px 0"}}>
        <div className="container" style={{display:"grid",gridTemplateColumns:"1fr 520px",alignItems:"center",gap:24}}>
          <div>
            <div className="badge" style={{marginBottom:12}}>{settings?.tagline}</div>
            <h1 style={{fontSize:44,fontWeight:900,lineHeight:1.02}}>{home.heroTitle}</h1>
            <p style={{color:"var(--muted)",marginTop:12}}>{home.heroSubtitle}</p>
            <div style={{marginTop:18}}>
              <a href="/shop" className="btn btn-primary">{home.heroCta}</a>
              <a href="#featured" className="btn btn-ghost" style={{marginLeft:12}}>Explore</a>
            </div>
          </div>
          <div className="card" style={{padding:18,display:"flex",alignItems:"center",justifyContent:"center"}}>
            <img src={home.heroImage} alt="Hero" style={{maxWidth:420,borderRadius:18}}/>
          </div>
        </div>
      </section>

      <section className="container" id="featured" style={{marginTop:24}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <h2 style={{fontSize:28,fontWeight:900}}>Featured Products</h2>
          <a href="/shop">View all</a>
        </div>
        <div className="grid-cards" style={{marginTop:12}}>
          {products.map(p=> <ProductCard key={p.id} p={p}/>)}
        </div>
      </section>
    </div>
  );
}
