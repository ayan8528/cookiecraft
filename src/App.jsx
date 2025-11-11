import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Shop from "./pages/Shop";

function Home() {
  return (
    <div style={{fontFamily:"system-ui", padding:"24px"}}>
      <h1>CookieCraft</h1>
      <p>Your cookies storefront is live ✅</p>
      <p><Link to="/shop">Go to Shop</Link></p>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <nav style={{padding:"12px 16px", borderBottom:"1px solid #eee"}}>
        <Link to="/" style={{marginRight:12}}>Home</Link>
        <Link to="/shop">Shop</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
      </Routes>
    </BrowserRouter>
  );
}
