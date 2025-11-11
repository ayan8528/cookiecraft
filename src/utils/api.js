export async function getHome(){ return (await fetch('/data/home.json')).json(); }
export async function getCategories(){ return (await fetch('/data/categories.json')).json(); }
export async function getProducts(){ return (await fetch('/data/products.json')).json(); }

export async function findProduct(slug){
  const data = await getProducts();
  return data.items.find(p => p.slug === slug);
}

export function priceWithOptions(base, variants, selected){
  let price = base ?? 0;
  (variants||[]).forEach(v=>{
    const sel = selected?.[v.name];
    const opt = v.options?.find(o=>o.value===sel);
    if (opt?.priceDelta) price += opt.priceDelta;
  });
  return price;
}
