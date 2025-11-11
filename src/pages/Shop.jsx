import React from "react";

export default function Shop() {
  const items = [
    { id: 1, name: "Classic Chocolate Chunk", price: 199 },
    { id: 2, name: "Vegan Double Choc", price: 219 },
    { id: 3, name: "Gluten-Free Almond", price: 249 },
  ];
  return (
    <div style={{maxWidth: 900, margin: "32px auto", padding: 16}}>
      <h2>Shop</h2>
      <ul>
        {items.map(i => (
          <li key={i.id} style={{padding:"8px 0", borderBottom:"1px solid #eee"}}>
            <b>{i.name}</b> — ₹{i.price}
          </li>
        ))}
      </ul>
    </div>
  );
}
