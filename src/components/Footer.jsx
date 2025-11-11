import React from "react";
export default function Footer(){
  return (
    <footer style={{marginTop:40, background:"#fff", borderTop:"1px solid #eee"}}>
      <div style={{maxWidth:1120, margin:"0 auto", padding:"24px 16px", display:"grid", gap:16}}>
        <div><b>CookieCraft</b><div>Handcrafted cookies made fresh in India.</div></div>
        <div style={{fontSize:12, color:"#777"}}>© {new Date().getFullYear()} CookieCraft.</div>
      </div>
    </footer>
  );
}
