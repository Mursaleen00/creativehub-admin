import type { ReactNode } from 'react';
const CSS = `
*{box-sizing:border-box}
body{font-family:ui-rounded,"Segoe UI",system-ui,sans-serif;margin:0;color:#3d3356;background:linear-gradient(135deg,#e8e0ff 0%,#d6ecff 45%,#ffe3f1 100%);min-height:100vh}
body:before{content:"";position:fixed;inset:0;background:radial-gradient(600px 400px at 15% 10%,rgba(255,255,255,.7),transparent 60%),radial-gradient(500px 400px at 90% 90%,rgba(255,255,255,.6),transparent 60%);pointer-events:none}
.wrap{max-width:960px;margin:0 auto;padding:32px 24px;position:relative}
h1{font-size:34px;letter-spacing:-.5px;margin:8px 0}
h2{font-size:22px}
.head{display:flex;justify-content:space-between;align-items:center;background:#fff8;border-radius:28px;padding:18px 24px;box-shadow:8px 8px 20px rgba(93,80,160,.18),-8px -8px 20px rgba(255,255,255,.9),inset 0 0 0 2px rgba(255,255,255,.7)}
.tabs{display:flex;gap:12px;margin:24px 0;flex-wrap:wrap}
.tabs button{border:0;border-radius:999px;padding:12px 20px;font-size:15px;font-weight:700;color:#5b4a7a;background:#fdfaff;cursor:pointer;box-shadow:6px 6px 14px rgba(93,80,160,.16),-6px -6px 14px rgba(255,255,255,.95),inset 2px 2px 4px rgba(255,255,255,.9);transition:transform .15s}
.tabs button:hover{transform:translateY(-2px)}
.tabs button.on{background:linear-gradient(135deg,#a78bfa,#f472b6);color:#fff;box-shadow:6px 6px 14px rgba(167,139,250,.45),inset 2px 2px 6px rgba(255,255,255,.5)}
section,form{scroll-margin-top:20px}
section{background:rgba(255,255,255,.65);border-radius:32px;padding:28px;box-shadow:10px 10px 24px rgba(93,80,160,.15),-10px -10px 24px rgba(255,255,255,.9),inset 0 0 0 2px rgba(255,255,255,.8);backdrop-filter:blur(6px)}
.grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.grid label{display:flex;flex-direction:column;gap:8px;font-size:14px;font-weight:600;color:#5b4a7a}
.grid .wide{grid-column:1/-1}
input,select,textarea{border:0;border-radius:18px;padding:13px 16px;font-size:15px;background:#f3f0ff;color:#3d3356;box-shadow:inset 4px 4px 10px rgba(93,80,160,.14),inset -4px -4px 10px rgba(255,255,255,.95);outline:none}
input:focus,select:focus,textarea:focus{box-shadow:inset 4px 4px 10px rgba(93,80,160,.14),inset -4px -4px 10px rgba(255,255,255,.95),0 0 0 3px rgba(167,139,250,.5)}
button{border:0;border-radius:999px;padding:13px 22px;font-size:15px;font-weight:700;color:#fff;background:linear-gradient(135deg,#8b7cf6,#ec4899);cursor:pointer;box-shadow:6px 6px 14px rgba(139,124,246,.4),inset 2px 2px 5px rgba(255,255,255,.5);transition:transform .15s}
button:hover{transform:translateY(-2px) scale(1.02)}
button:active{transform:scale(.97);box-shadow:inset 4px 4px 10px rgba(0,0,0,.15)}
table{width:100%;border-collapse:separate;border-spacing:0;margin-top:20px;overflow:hidden;border-radius:20px;background:#fff}
th,td{text-align:left;padding:12px 14px;font-size:14px}
th{background:#ede9fe;color:#5b4a7a}
tbody tr:nth-child(even){background:#faf7ff}
a{color:#7c3aed;font-weight:600}
.err{color:#be185d;font-weight:700}
@media(max-width:640px){.grid{grid-template-columns:1fr}}
`;
export default function RootLayout({ children }: { children: ReactNode }) {
  return (<html lang="en"><body><style>{CSS}</style>{children}</body></html>);
}
