const CART_KEY='cookiecraft_cart', WISHLIST_KEY='cookiecraft_wishlist', COMPARE_KEY='cookiecraft_compare';
const read = k => { try { return JSON.parse(localStorage.getItem(k)||'[]'); } catch { return []; } };
const write = (k,v) => localStorage.setItem(k, JSON.stringify(v));

export const cart = {
  get: ()=>read(CART_KEY),
  add: (item)=>{
    const c=read(CART_KEY);
    const idx=c.findIndex(i=>i.id===item.id && JSON.stringify(i.options||{})===JSON.stringify(item.options||{}));
    if(idx>-1) c[idx].qty += item.qty||1; else c.push({...item, qty:item.qty||1});
    write(CART_KEY,c); return c;
  },
  update:(id, options, qty)=>{ const c=read(CART_KEY); const i=c.findIndex(x=>x.id===id && JSON.stringify(x.options||{})===JSON.stringify(options||{})); if(i>-1){ c[i].qty=qty; write(CART_KEY,c);} return c; },
  remove:(id, options)=>{ let c=read(CART_KEY).filter(x=>!(x.id===id && JSON.stringify(x.options||{})===JSON.stringify(options||{}))); write(CART_KEY,c); return c; },
  clear:()=>{ write(CART_KEY,[]); return []; }
};
export const wishlist = { get:()=>read(WISHLIST_KEY), toggle:(id)=>{ let w=read(WISHLIST_KEY); w=w.includes(id)?w.filter(x=>x!==id):[...w,id]; write(WISHLIST_KEY,w); return w; } };
export const compare = { get:()=>read(COMPARE_KEY), toggle:(id)=>{ let w=read(COMPARE_KEY); w=w.includes(id)?w.filter(x=>x!==id):[...w,id]; write(COMPARE_KEY,w); return w; } };
