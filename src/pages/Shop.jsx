import React, { useEffect, useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";
import { getCategories, getProducts } from "../utils/api";
import { useSearchParams } from "react-router-dom";

export default function Shop(){
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [min,setMin]=useState(""); const [max,setMax]=useState(""); const [cat,setCat]=useState(""); const [q,setQ]=useState("");
  const [params] = useSearchParams();

  useEffect(()=>{ getCategories().then(d=>setCategories(d.items)); getProducts().then(d=>setProducts(d.items)); },[]);
  useEffect(()=>{ const c=params.get("category"); if(c) setCat(c); },[params]);

  const filtered = useMemo(()=>products.filter(p=>{
    const price = p.salePrice ?? p.price;
    if(min && price < Number(min)) return false;
    if(max && price > Number(max)) return false;
    if(cat && p.category !== cat) return false;
    if(q && !p.title.toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  }),[products,min,max,cat,q]);

  return (
    <div style={{maxWidth:1120, margin:"0 auto", padding:"24px 16px", display:"grid", gridTemplateColumns:"260px 1fr", gap:16}}>
      <aside style={{border:"1px solid #eee", borderRadius:16, padding:12, height:"fit-content", position:"sticky", top:64}}>
        <div style={{fontWeight:700, marginBottom:8}}>Filters</div>
        <div style={{marginBottom:8}}>
          <label style={{fontSize:12}}>Search</label>
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Find cookies..." style={{width:"100%",padding:8,borderRadius:12,border:"1px solid #ddd"}}/>
        </div>
        <div style={{marginBottom:8}}>
          <label style={{fontSize:12}}>Category</label>
          <select value={cat} onChange={e=>setCat(e.target.value)} style={{width:"100%",padding:8,borderRadius:12,border:"1px solid #ddd"}}>
            <option value="">All</option>
            {categories.map(c=><option key={c.slug} value={c.slug}>{c.name}</option>)}
          </select>
        </div>
        <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:8}}>
          <div><label style={{fontSize:12}}>Min ₹</label><input type="number" value={min} onChange={e=>setMin(e.target.value)} style={{width:"100%",padding:8,borderRadius:12,border:"1px solid #ddd"}}/></div>
          <div><label style={{fontSize:12}}>Max ₹</label><input type="number" value={max} onChange={e=>setMax(e.target.value)} style={{width:"100%",padding:8,borderRadius:12,border:"1px solid #ddd"}}/></div>
        </div>
        <button onClick={()=>{ setQ(""); setCat(""); setMin(""); setMax(""); }} style={{width:"100%", marginTop:8, padding:"8px 12px", border:"1px solid #ddd", borderRadius:12, background:"#fff"}}>Reset</button>
      </aside>

      <section>
        <div style={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>
          <h1 style={{fontSize:24, fontWeight:800}}>Shop</h1>
          <div style={{fontSize:12, color:"#6b7280"}}>{filtered.length} results</div>
        </div>
        <div style={{marginTop:12, display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))", gap:12}}>
          {filtered.map(p=><ProductCard key={p.id} p={p} />)}
        </div>
      </section>
    </div>
  );
}
