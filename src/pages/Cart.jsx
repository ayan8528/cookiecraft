import React, { useEffect, useState } from "react";
import { cart as cartStore } from "../store/cart";

export default function Cart(){
  const [items,setItems]=useState(cartStore.get());
  useEffect(()=>{ setItems(cartStore.get()); },[]);
  const total = items.reduce((s,i)=>s + i.price * i.qty, 0);

  const update=(i,qty)=>{ cartStore.update(i.id,i.options,qty); setItems(cartStore.get()); };
  const remove=(i)=>{ cartStore.remove(i.id,i.options); setItems(cartStore.get()); };

  return (
    <div style={{maxWidth:1120, margin:"0 auto", padding:"24px 16px"}}>
      <h1 style={{fontSize:24, fontWeight:800, marginBottom:8}}>Your Cart</h1>
      {items.length===0 && <div>Your cart is empty.</div>}
      <div style={{display:"grid", gap:8}}>
        {items.map((i,idx)=>(
          <div key={idx} style={{display:"flex", gap:12, alignItems:"center", border:"1px solid #eee", borderRadius:16, padding:12}}>
            <img src={i.image} alt="" style={{width:80, height:80, objectFit:"cover", borderRadius:12}}/>
            <div style={{flex:1}}>
              <div style={{fontWeight:700}}>{i.title}</div>
              {i.options && <div style={{fontSize:12, color:"#6b7280"}}>Options: {Object.entries(i.options).map(([k,v])=>`${k}:${v}`).join(", ")}</div>}
              <div>₹{i.price}</div>
            </div>
            <input type="number" min="1" value={i.qty} onChange={e=>update(i,parseInt(e.target.value||1))} style={{width:70, padding:6, borderRadius:12, border:"1px solid #ddd"}}/>
            <button onClick={()=>remove(i)} style={{padding:"8px 12px", border:"1px solid #ddd", borderRadius:12}}>Remove</button>
          </div>
        ))}
      </div>
      <div style={{textAlign:"right", marginTop:12}}>
        <div style={{fontSize:18, fontWeight:800}}>Total: ₹{total}</div>
        <button style={{marginTop:8, padding:"10px 14px", background:"#2b7a0b", color:"#fff", borderRadius:12}}>Checkout (stub)</button>
      </div>
    </div>
  );
}
