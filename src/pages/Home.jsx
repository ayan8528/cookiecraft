import React, { useEffect, useState } from "react";
import { getHome, getProducts } from "../utils/api";
import ProductCard from "../components/ProductCard";

export default function Home(){
  const [home,setHome]=useState(null);
  const [settings,setSettings]=useState(null);
  const [products,setProducts]=useState([]);
  const [reviews,setReviews]=useState([]);

  useEffect(()=>{
    getHome().then(setHome);
    getProducts().then(d=>setProducts(d.items.filter(p=>!p.hidden).slice(0,8)));
    fetch("/data/settings.json").then(r=>r.json()).then(setSettings);
    fetch("/data/reviews.json").then(r=>r.json()).then(d=>setReviews(d.items||[]));
  },[]);

  if(!home) return null;

  return (
    <div>
      <section className="container" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
        <div>
          <div className="badge" style={{marginBottom:8}}>{settings?.tagline || "Fresh daily"}</div>
          <h1 style={{fontSize:40,fontWeight:900,lineHeight:1.1}}>{home.heroTitle}</h1>
          <p style={{marginTop:8,color:"var(--muted)"}}>{home.heroSubtitle}</p>
          <div style={{marginTop:16}}>
            <a href="/shop" className="btn btn-primary">{home.heroCta || "Shop now"}</a>
            <a href="#featured" className="btn btn-ghost" style={{marginLeft:8}}>Explore</a>
          </div>
        </div>
        <div className="card" style={{overflow:"hidden"}}>
          <img src={home.heroImage} alt="" />
        </div>
      </section>

      <section className="container" id="featured">
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <h2 style={{fontSize:28,fontWeight:900}}>Featured Products</h2>
          <a href="/shop">View all</a>
        </div>
        <div className="grid-cards" style={{marginTop:12}}>
          {products.map(p=> <ProductCard key={p.id} p={p}/>)}
        </div>
      </section>

      <section className="container" id="reviews" style={{marginTop:24}}>
        <h2 style={{fontSize:24,fontWeight:900}}>What customers say</h2>
        <div className="grid-cards" style={{marginTop:12}}>
          {reviews.map((r,i)=>(
            <div key={i} className="card" style={{padding:14}}>
              <div style={{fontWeight:700}}>{r.name}</div>
              <div style={{color:"#eab308"}}>{"★".repeat(r.rating)}{"☆".repeat(5-r.rating)}</div>
              <p style={{color:"var(--muted)"}}>{r.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="container" style={{marginTop:24}}>
        <div className="card" style={{padding:16}}>
          <h2 style={{fontSize:24,fontWeight:900}}>Contact us</h2>
          <div style={{color:"var(--muted)"}}>
            {settings?.email} • {settings?.phone} • {settings?.address}
          </div>
        </div>
      </section>
    </div>
  );
}
