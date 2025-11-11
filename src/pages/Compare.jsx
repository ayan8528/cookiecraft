import React, { useEffect, useState } from "react";
import { compare } from "../store/cart";
import { getProducts } from "../utils/api";

export default function Compare(){
  const [ids,setIds]=useState(compare.get());
  const [items,setItems]=useState([]);
  useEffect(()=>{ getProducts().then(d=>setItems(d.items.filter(p=>ids.includes(p.id)))); },[ids]);

  return (
    <div style={{maxWidth:1120, margin:"0 auto", padding:"24px 16px"}}>
      <h1 style={{fontSize:24, fontWeight:800, marginBottom:8}}>Compare</h1>
      {items.length===0 ? <div>No items selected.</div> :
      <div style={{overflowX:"auto"}}>
        <table style={{minWidth:640, width:"100%", borderCollapse:"collapse"}}>
          <thead><tr>
            <th style={{textAlign:"left", padding:8, borderBottom:"1px solid #eee"}}>Product</th>
            <th style={{textAlign:"left", padding:8, borderBottom:"1px solid #eee"}}>Price</th>
            <th style={{textAlign:"left", padding:8, borderBottom:"1px solid #eee"}}>Brand</th>
            <th style={{textAlign:"left", padding:8, borderBottom:"1px solid #eee"}}>In Stock</th>
          </tr></thead>
          <tbody>
            {items.map(i=>(
              <tr key={i.id}>
                <td style={{padding:8, borderBottom:"1px solid #f3f4f6", display:"flex", alignItems:"center", gap:8}}>
                  <img src={i.images?.[0]} style={{width:48, height:48, borderRadius:8, objectFit:"cover"}}/>
                  <div>{i.title}</div>
                </td>
                <td style={{padding:8, borderBottom:"1px solid #f3f4f6"}}>₹{i.salePrice ?? i.price}</td>
                <td style={{padding:8, borderBottom:"1px solid #f3f4f6"}}>{i.brand||"-"}</td>
                <td style={{padding:8, borderBottom:"1px solid #f3f4f6"}}>{i.inStock?"Yes":"No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>}
    </div>
  );
}
