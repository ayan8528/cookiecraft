import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header(){
  const nav = useNavigate();
  const [settings,setSettings]=useState(null);
  const [navLinks,setNavLinks]=useState([]);

  useEffect(()=>{
    fetch("/data/settings.json").then(r=>r.json()).then(setSettings);
    fetch("/data/nav.json").then(r=>r.json()).then(d=>setNavLinks(d.links||[]));
  },[]);

  useEffect(()=>{
    if(settings){
      document.documentElement.style.setProperty("--brand", settings.primary || "#2b7a0b");
      document.documentElement.style.setProperty("--accent", settings.accent || "#e3b26c");
      if(settings.seo?.title) document.title = settings.seo.title;
      if(settings.seo?.description){
        let m=document.querySelector('meta[name="description"]'); 
        if(!m){ m=document.createElement("meta"); m.name="description"; document.head.appendChild(m); }
        m.content = settings.seo.description;
      }
    }
  },[settings]);

  return (
    <header style={{position:"sticky",top:0,backdropFilter:"blur(6px)",background:"#ffffffb3",borderBottom:"1px solid var(--border)",zIndex:50}}>
      <div className="container" style={{display:"flex",alignItems:"center",gap:16}}>
        <button onClick={()=>nav('/shop')} className="btn btn-ghost">Menu</button>
        <Link to="/" style={{display:"flex",alignItems:"center",gap:10,fontWeight:900,fontSize:20,color:"var(--brand)"}}>
          {settings?.logo && <img src={settings.logo} alt="" style={{width:28,height:28,borderRadius:8}}/>}
          {settings?.brandName || "CookieCraft"}
        </Link>
        <nav style={{marginLeft:16,display:"flex",gap:16,flexWrap:"wrap"}}>
          {navLinks.map((l,i)=><Link key={i} to={l.to}>{l.label}</Link>)}
        </nav>
        <div style={{marginLeft:"auto",display:"flex",gap:10}}>
          <Link to="/wishlist" className="btn btn-ghost" title="Wishlist">♡</Link>
          <Link to="/compare"  className="btn btn-ghost" title="Compare">⇄</Link>
          <Link to="/cart"     className="btn btn-primary">Cart</Link>
        </div>
      </div>
    </header>
  );
}
