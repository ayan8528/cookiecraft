import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header(){
  const nav = useNavigate();
  const [s,setS]=useState(null);
  const [navLinks,setNavLinks]=useState([]);

  useEffect(()=>{ fetch("/data/settings.json").then(r=>r.json()).then(setS); fetch("/data/nav.json").then(r=>r.json()).then(d=>setNavLinks(d.links||[])); },[]);

  useEffect(()=>{ if(s){ document.documentElement.style.setProperty("--brand", s.primary || "#2b7a0b"); document.documentElement.style.setProperty("--accent", s.accent || "#e3b26c"); } },[s]);

  return (
    <header style={{position:"sticky",top:0,background:"#fff",borderBottom:"1px solid var(--border)",zIndex:50}}>
      <div className="container" style={{display:"flex",alignItems:"center",gap:12}}>
        <button onClick={()=>nav('/shop')} className="btn btn-ghost">Menu</button>
        <Link to="/" style={{display:"flex",alignItems:"center",gap:10,fontWeight:900,fontSize:20,color:"var(--brand)"}}>
          {s?.logo && <img src={s.logo} alt="" style={{width:34,height:34,borderRadius:8}}/>}
          {s?.brandName || "CrazeeFood"}
        </Link>
        <nav style={{marginLeft:16,display:"flex",gap:16}}>
          {navLinks.map((l,i)=><Link key={i} to={l.to}>{l.label}</Link>)}
        </nav>
        <div style={{marginLeft:"auto",display:"flex",gap:10}}>
          <Link to="/wishlist" className="btn btn-ghost" title="Wishlist">♡</Link>
          <Link to="/compare" className="btn btn-ghost" title="Compare">⇄</Link>
          <Link to="/cart" className="btn btn-primary">Cart</Link>
        </div>
      </div>
    </header>
  );
}
