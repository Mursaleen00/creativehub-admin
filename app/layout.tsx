import type { ReactNode } from 'react';
const CSS = `
@import url("https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&family=JetBrains+Mono:wght@600&display=swap");
:root{
  --clay-bg:#e4e8f0; --clay-card:#eef2f9; --clay-card-inner:#e2e8f4;
  --clay-primary:#6366f1; --clay-primary-light:#818cf8;
  --clay-text:#1e293b; --clay-muted:#64748b; --clay-amber:#f59e0b; --clay-emerald:#10b981;
  --clay-shadow:8px 8px 16px rgba(166,175,195,.6),-8px -8px 16px rgba(255,255,255,.9),inset 2px 2px 3px rgba(255,255,255,.8),inset -2px -2px 3px rgba(166,175,195,.3);
  --clay-shadow-sm:4px 4px 10px rgba(166,175,195,.5),-4px -4px 10px rgba(255,255,255,.9),inset 1.5px 1.5px 2px rgba(255,255,255,.8),inset -1.5px -1.5px 2px rgba(166,175,195,.25);
  --clay-pressed:inset 4px 4px 8px rgba(166,175,195,.6),inset -4px -4px 8px rgba(255,255,255,.9);
}
*{box-sizing:border-box}
body{font-family:"Plus Jakarta Sans",sans-serif;margin:0;color:var(--clay-text);background:var(--clay-bg);min-height:100vh;-webkit-font-smoothing:antialiased}
.wrap{max-width:960px;margin:0 auto;padding:32px 24px}
h1{font-size:30px;font-weight:800;letter-spacing:-.5px;margin:8px 0}
h2{font-size:20px;font-weight:800}
.head{display:flex;justify-content:space-between;align-items:center;background:var(--clay-card);border-radius:20px;padding:16px 22px;box-shadow:var(--clay-shadow)}
.tabs{display:flex;gap:12px;margin:22px 0;flex-wrap:wrap}
.tabs button{border:0;border-radius:16px;padding:11px 18px;font-family:inherit;font-size:14px;font-weight:700;color:var(--clay-text);background:var(--clay-card);cursor:pointer;box-shadow:var(--clay-shadow-sm);transition:transform .1s,box-shadow .1s}
.tabs button:hover{transform:translateY(-1px)}
.tabs button.on{background:var(--clay-primary);color:#fff;box-shadow:6px 6px 14px rgba(99,102,241,.35),-4px -4px 12px rgba(255,255,255,.8),inset 2px 2px 3px rgba(255,255,255,.4),inset -2px -2px 3px rgba(49,46,129,.3)}
.tabs button:active,.grid button:active,form button:active{transform:scale(.97);box-shadow:var(--clay-pressed)}
section{background:var(--clay-card);border-radius:20px;padding:24px;box-shadow:var(--clay-shadow)}
.grid{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.grid label{display:flex;flex-direction:column;gap:7px;font-size:13px;font-weight:700;color:var(--clay-muted)}
.grid .wide{grid-column:1/-1}
input,select,textarea{border:0;border-radius:14px;padding:11px 14px;font-family:inherit;font-size:14px;font-weight:600;background:var(--clay-card-inner);color:var(--clay-text);outline:none;box-shadow:var(--clay-pressed)}
input:focus,select:focus,textarea:focus{box-shadow:var(--clay-pressed),0 0 0 3px rgba(99,102,241,.35)}
button{border:0;border-radius:16px;padding:11px 20px;font-family:inherit;font-size:14px;font-weight:700;color:#fff;background:var(--clay-primary);cursor:pointer;box-shadow:6px 6px 14px rgba(99,102,241,.35),-4px -4px 12px rgba(255,255,255,.8),inset 2px 2px 3px rgba(255,255,255,.4),inset -2px -2px 3px rgba(49,46,129,.3);transition:transform .1s}
button:hover{background:var(--clay-primary-light)}
table{width:100%;border-collapse:separate;border-spacing:0;margin-top:18px;overflow:hidden;border-radius:16px;background:var(--clay-card);box-shadow:var(--clay-shadow-sm)}
th,td{text-align:left;padding:11px 13px;font-size:14px}
th{background:var(--clay-card-inner);color:var(--clay-muted);font-weight:700}
tbody tr:nth-child(even){background:#f7f9fd}
a{color:#4338ca;font-weight:700}
.err{color:#d97706;font-weight:700}
@media(max-width:640px){.grid{grid-template-columns:1fr}}
`;
export default function RootLayout({ children }: { children: ReactNode }) {
  return (<html lang="en"><body><style>{CSS}</style>{children}</body></html>);
}
