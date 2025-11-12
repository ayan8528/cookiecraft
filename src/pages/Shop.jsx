import React, { useEffect, useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";
import { getCategories, getProducts } from "../utils/api";
import { useSearchParams } from "react-router-dom";

const isNew = (dateStr) => {
  if(!dateStr) return false;
  const d = new Date(dateStr);
  const days = (Date.now()-d.getTime())/86400000;
  return days <= 30;
};

export default function Shop(){
  const [categories,setCategories]=useState([]);
  const [products,setProducts]=useState([]);
  const [min,setMin]=useState(""); const [max,setMax]=useState("");
  const [cat,setCat]=useState(""); const [q,setQ]=useState("");
  const [sort,setSort]=useState("pop");
  const [params]=useSearchParams();

  useEffect(()=>{ getCategories().then(d=>setCategories(d.items)); getProducts().then(d=>setProducts(d.items.filter(p=>!p.hidden))); },[]);
  useEffect(()=>{ const c=params.get("category"); if(c) setCat(c); },[params]);

  const filtered = useMemo(()=>products.filter(p=>{
    const price = p.salePrice ?? p.price;
    if(min && price < Number(min)) return false;
    if(max && price > Number(max)) return false;
    if(cat && p.category !== cat) return false;
    if(q && !p.title.toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  }),[products,min,max,cat,q]);

  const sorted = useMemo(()=>{
    const arr=[...filtered];
    if(sort==="price-asc") arr.sort((a,b)=>(a.salePrice??a.price)-(b.salePrice??b.price));
    if(sort==="price-desc") arr.sort((a,b)=>(b.salePrice??b.price)-(a.salePrice??a.price));
    if(sort==="new") arr.sort((a,b)=>new Date(b.dateAdded||0)-new Date(a.dateAdded||0));
    return arr;
  },[filtered,sort]);

  return (
    <div className="container" style={{display:"grid",gridTemplateColumns:"260px 1fr",gap:16}}>
      <aside className="card sticky" style={{padding:12,height:"fit-content"}}>
        <div style={{fontWeight:700,marginBottom:8}}>Filters</div>
        <label style={{fontSize:12}}>Search</label>
        <input className="input" value={q} onChange={e=>setQ(e.target.value)} placeholder="Find cookies..." />
        <div style={{marginTop:8}}>
          <label style={{fontSize:12}}>Category</label>
          <select className="input" value={cat} onChange={e=>setCat(e.target.value)}>
            <option value="">All</option>
            {categories.map(c=><option key={c.slug} value={c.slug}>{c.name}</option>)}
          </select>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginTop:8}}>
          <div><label style={{fontSize:12}}>Min ₹</label><input type="number" className="input" value={min} onChange={e=>setMin(e.target.value)} /></div>
          <div><label style={{fontSize:12}}>Max ₹</label><input type="number" className="input" value={max} onChange={e=>setMax(e.target.value)} /></div>
        </div>
        <button className="btn btn-ghost" style={{width:"100%",marginTop:8}} onClick={()=>{setQ("");setCat("");setMin("");setMax("");setSort("pop");}}>Reset</button>
      </aside>

      <section>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <h1 style={{fontSize:28,fontWeight:900}}>Shop</h1>
          <select className="input" style={{maxWidth:220}} value={sort} onChange={e=>setSort(e.target.value)}>
            <option value="pop">Sort: Popular</option>
            <option value="new">Sort: Newest</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
          </select>
        </div>
        <div className="grid-cards" style={{marginTop:12}}>
          {sorted.map(p=><div key={p.id}>
            {isNew(p.dateAdded) && <span className="badge" style={{position:"absolute",transform:"translateY(-8px)"}}>New</span>}
            <ProductCard p={p}/>
          </div>)}
        </div>
      </section>
    </div>
  );
}
