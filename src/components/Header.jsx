import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header(){
  const nav = useNavigate();
  return (
    <header style={{position:"sticky",top:0,backdropFilter:"blur(6px)",background:"#fffccf80",borderBottom:"1px solid #eee",zIndex:50}}>
      <div style={{maxWidth:1120,margin:"0 auto",padding:"12px 16px",display:"flex",alignItems:"center",gap:12}}>
        <button onClick={()=>nav('/shop')} style={{display:"inline-flex",padding:"8px 12px",border:"1px solid #ddd",borderRadius:12,background:"#fff"}}>Menu</button>
        <Link to="/" style={{fontWeight:800,fontSize:20,color:"#2b7a0b"}}>CookieCraft</Link>
        <nav style={{marginLeft:16,display:"flex",gap:16}}>
          <Link to="/">Home</Link>
          <Link to="/shop">Shop</Link>
        </nav>
        <div style={{marginLeft:"auto",display:"flex",gap:10}}>
          <Link to="/wishlist" title="Wishlist">♡</Link>
          <Link to="/compare" title="Compare">⇄</Link>
          <Link to="/cart" style={{padding:"8px 12px",borderRadius:12,background:"#2b7a0b",color:"#fff"}}>Cart</Link>
        </div>
      </div>
    </header>
  );
}
