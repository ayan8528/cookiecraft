import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { findProduct, priceWithOptions } from "../utils/api";
import { cart as cartStore } from "../store/cart";

export default function Product(){
  const { slug } = useParams();
  const [p,setP]=useState(null);
  const [sel,setSel]=useState({});
  const [qty,setQty]=useState(1);
  useEffect(()=>{ findProduct(slug).then(setP); },[slug]);
  const price = useMemo(()=> p ? priceWithOptions(p.salePrice ?? p.price, p.variants, sel) : 0,[p,sel]);
  if(!p) return <div style={{maxWidth:1120, margin:"0 auto", padding:"24px 16px"}}>Loading…</div>;
  const add=()=>{ cartStore.add({ id:p.id, title:p.title, price, options:sel, image:p.images?.[0], qty }); alert("Added to cart"); };

  return (
    <div style={{maxWidth:1120, margin:"0 auto", padding:"24px 16px", display:"grid", gridTemplateColumns:"1fr 1fr", gap:16}}>
      <div><img src={p.images?.[0]} alt={p.title} style={{width:"100%", borderRadius:16, border:"1px solid #eee"}}/></div>
      <div>
        <div style={{fontSize:12, color:"#6b7280"}}>{p.brand} • {p.category}</div>
        <h1 style={{fontSize:28, fontWeight:900, marginTop:4}}>{p.title}</h1>
        <div style={{marginTop:8, fontSize:24, fontWeight:900}}>₹{price}</div>
        {(p.variants||[]).map(v=>(
          <div key={v.name} style={{marginTop:8}}>
            <label style={{fontSize:12}}>{v.name}</label>
            <select value={sel[v.name]||""} onChange={e=>setSel(s=>({...s,[v.name]:e.target.value}))} style={{width:"100%",padding:8,borderRadius:12,border:"1px solid #ddd", marginTop:4}}>
              <option value="">Choose {v.name}</option>
              {(v.options||[]).map(o=><option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
        ))}
        <div style={{marginTop:10, display:"flex", gap:8, alignItems:"center"}}>
          <input type="number" min="1" value={qty} onChange={e=>setQty(parseInt(e.target.value||1))} style={{width:80, padding:8, borderRadius:12, border:"1px solid #ddd"}}/>
          <button onClick={add} style={{padding:"10px 14px", background:"#2b7a0b", color:"#fff", borderRadius:12}}>Add to cart</button>
        </div>
        <div style={{marginTop:16}}>
          <p>{p.longDesc || p.shortDesc}</p>
          <ul>{(p.attributes||[]).map((a,i)=><li key={i}><b>{a.name}:</b> {a.value}</li>)}</ul>
        </div>
      </div>
    </div>
  );
}
