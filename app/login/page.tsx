'use client';
import { useState } from 'react';
export default function Login() {
  const [pw, setPw] = useState(''); const [err, setErr] = useState('');
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const r = await fetch('/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password: pw }) });
    if (r.ok) window.location.href = '/admin'; else setErr('Wrong password.');
  }
  return (<main className="wrap"><h1>Mission Control</h1><p>Admin login — Mursaleen only.</p><form onSubmit={submit}><input type="password" value={pw} onChange={e => setPw(e.target.value)} placeholder="Admin password" autoFocus /><button>Sign in</button>{err && <p className="err">{err}</p>}</form></main>);
}
