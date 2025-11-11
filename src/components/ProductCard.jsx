import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { priceWithOptions } from "../utils/api";
import { cart as cartStore, wishlist as wishStore, compare as compStore } from "../store/cart";

export default function ProductCard({ p }){
  const [sel, setSel] = useState({});
  const price = useMemo(()=>priceWithOptions(p.salePrice ?? p.price, p.variants, sel), [p, sel]);

  const onAdd = ()=>{
    cartStore.add({ id:p.id, title:p.title, price, options:sel, image:p.images?.[0] });
    alert("Added to cart");
  };

  return (
    <div style={{background:"#fff", border:"1px solid #eee", borderRadius:16, padding:12}}>
      <Link to={`/product/${p.slug}`}>
        <img src={p.images?.[0]} alt={p.title} style={{width:"100%", aspectRatio:"1/1", objectFit:"cover", borderRadius:12}}/>
      </Link>
      <div style={{marginTop:8, fontSize:12, color:"#6b7280"}}>{p.brand||"CookieCraft"} • {p.category}</div>
      <Link to={`/product/${p.slug}`} style={{display:"block", fontWeight:700, marginTop:4}}>{p.title}</Link>

      {(p.variants||[]).map(v=>(
        <div key={v.name} style={{marginTop:8}}>
          <label style={{fontSize:12}}>{v.name}</label>
          <select value={sel[v.name]||""} onChange={e=>setSel(s=>({...s,[v.name]:e.target.value}))} style={{width:"100%", padding:"8px", borderRadius:12, border:"1px solid #ddd", marginTop:4}}>
            <option value="">Choose {v.name}</option>
            {(v.options||[]).map(o=><option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
      ))}

      <div style={{marginTop:10, display:"flex", alignItems:"center", justifyContent:"space-between"}}>
        <div style={{fontSize:18, fontWeight:800}}>₹{price}</div>
        <div style={{display:"flex", gap:6}}>
          <button onClick={()=>{ wishStore.toggle(p.id); alert("Wishlist toggled"); }} title="Wishlist" style={{border:"1px solid #ddd", borderRadius:12, background:"#fff", padding:"6px 10px"}}>♡</button>
          <button onClick={()=>{ compStore.toggle(p.id); alert("Compare toggled"); }} title="Compare" style={{border:"1px solid #ddd", borderRadius:12, background:"#fff", padding:"6px 10px"}}>⇄</button>
          <button onClick={onAdd} style={{background:"#2b7a0b", color:"#fff", borderRadius:12, padding:"6px 10px"}}>Add</button>
        </div>
      </div>
    </div>
  );
}
