'use client';
import { useEffect, useState } from 'react';
const APPS: [string, string][] = [['tabSaver','TabPress'],['notionClipper','ClipPress'],['linkedinCrm','LeadPress'],['aiReply','ReplyPress'],['ecomSpy','SellerPress'],['ytPdfSummarizer','SumPress'],['bugRecorder','BugPress'],['jobAutofill','HirePress'],['cookieSwitcher','SessionPress'],['sqlCopilot','QueryPress']];
const STORES = ['chrome','edge','firefox','opera'];
const STATUSES = ['Draft','In Review','Published','Slot Locked','Needs Update'];
type Row = Record<string, unknown>;
export default function Admin() {
  const [tab, setTab] = useState('matrix');
  const [matrix, setMatrix] = useState<Row[]>([]); const [control, setControl] = useState<Row[]>([]);
  const [feedback, setFeedback] = useState<Row[]>([]); const [testers, setTesters] = useState<Row[]>([]);
  const [revenue, setRevenue] = useState<Row | null>(null); const [msg, setMsg] = useState('');
  const [m, setM] = useState({ app_key: 'bugRecorder', store: 'chrome', status: 'Draft', live_version: '', monorepo_version: '0.1.0', store_url: '', permission_justification: '', firefox_source_bundle_status: '' });
  const [c, setC] = useState({ app_key: 'bugRecorder', active: true, announcement: '', promo: '', kill_switch: false, kill_until: '', free_limit_override: '' });
  const [t, setT] = useState({ app_key: 'bugRecorder', license_key: '', note: '' });
  async function load() {
    const [a, b, d, e, f] = await Promise.all(['/api/admin/matrix','/api/admin/control','/api/admin/feedback','/api/admin/testers','/api/admin/revenue'].map(u => fetch(u).then(r => r.json()).catch(() => ({}))));
    setMatrix(a.rows || []); setControl(b.rows || []); setFeedback(d.rows || []); setTesters(e.rows || []); setRevenue(f);
  }
  useEffect(() => { load(); }, []);
  async function post(url: string, body: unknown) {
    const r = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    const j = await r.json(); setMsg(r.ok ? (j.note || 'Saved.') : ('Error: ' + (j.error || 'failed'))); if (r.ok) load();
  }
  const name = (k: string) => APPS.find(a => a[0] === k)?.[1] || k;
  return (<main className="wrap">
    <header className="head"><h1>Mission Control</h1><button onClick={async () => { await fetch('/api/auth/logout', { method: 'POST' }); window.location.href = '/login'; }}>Log out</button></header>
    <nav className="tabs">{['matrix','control','feedback','testers','revenue'].map(t => <button key={t} className={tab === t ? 'on' : ''} onClick={() => setTab(t)}>{t}</button>)}</nav>
    {msg && <p>{msg}</p>}
    {tab === 'revenue' && revenue && (<section><h2>Revenue — $1,000 goal</h2><p><b>${((Number(revenue.net_cents) || 0) / 100).toFixed(2)}</b> net from {String(revenue.orders)} orders. {String(revenue.note || '')}</p></section>)}
    {tab === 'matrix' && (<section><h2>Store matrix</h2><form className="grid" onSubmit={e => { e.preventDefault(); post('/api/admin/matrix', m); }}>
      <label>Extension<select value={m.app_key} onChange={e => setM({ ...m, app_key: e.target.value })}>{APPS.map(a => <option key={a[0]} value={a[0]}>{a[1]}</option>)}</select></label>
      <label>Store<select value={m.store} onChange={e => setM({ ...m, store: e.target.value })}>{STORES.map(s => <option key={s}>{s}</option>)}</select></label>
      <label>Status<select value={m.status} onChange={e => setM({ ...m, status: e.target.value })}>{STATUSES.map(s => <option key={s}>{s}</option>)}</select></label>
      <label>Live version<input value={m.live_version} onChange={e => setM({ ...m, live_version: e.target.value })} /></label>
      <label>Store URL<input value={m.store_url} onChange={e => setM({ ...m, store_url: e.target.value })} /></label>
      <label>Firefox source bundle<input value={m.firefox_source_bundle_status} onChange={e => setM({ ...m, firefox_source_bundle_status: e.target.value })} placeholder="e.g. Ready / N/A" /></label>
      <label className="wide">Permission justification<textarea value={m.permission_justification} onChange={e => setM({ ...m, permission_justification: e.target.value })} /></label>
      <button className="wide">Save matrix row</button></form>
      <table><thead><tr><th>Extension</th><th>Store</th><th>Status</th><th>Live</th><th>URL</th></tr></thead><tbody>{matrix.map((r, i) => <tr key={i}><td>{name(String(r.app_key))}</td><td>{String(r.store)}</td><td>{String(r.status)}</td><td>{String(r.live_version || '')}</td><td>{r.store_url ? <a href={String(r.store_url)}>link</a> : ''}</td></tr>)}</tbody></table></section>)}
    {tab === 'control' && (<section><h2>Remote control (public endpoint)</h2><p>No keys or revoked keys here — revocation is via LemonSqueezy license checks only.</p><form className="grid" onSubmit={e => { e.preventDefault(); post('/api/admin/control', { ...c, announcement: c.announcement ? { text: c.announcement } : null, promo: c.promo ? { text: c.promo } : null }); }}>
      <label>Extension<select value={c.app_key} onChange={e => setC({ ...c, app_key: e.target.value })}>{APPS.map(a => <option key={a[0]} value={a[0]}>{a[1]}</option>)}</select></label>
      <label>Active<input type="checkbox" checked={c.active} onChange={e => setC({ ...c, active: e.target.checked })} /></label>
      <label>Kill switch<input type="checkbox" checked={c.kill_switch} onChange={e => setC({ ...c, kill_switch: e.target.checked })} /></label>
      <label>Kill until<input type="datetime-local" value={c.kill_until} onChange={e => setC({ ...c, kill_until: e.target.value })} /></label>
      <label>Free limit override<input value={c.free_limit_override} onChange={e => setC({ ...c, free_limit_override: e.target.value })} placeholder="number or blank" /></label>
      <label className="wide">Announcement<textarea value={c.announcement} onChange={e => setC({ ...c, announcement: e.target.value })} /></label>
      <label className="wide">Promo<textarea value={c.promo} onChange={e => setC({ ...c, promo: e.target.value })} /></label>
      <button className="wide">Save control</button></form>
      <table><thead><tr><th>Extension</th><th>Active</th><th>Kill</th><th>Kill until</th></tr></thead><tbody>{control.map((r, i) => <tr key={i}><td>{name(String(r.app_key))}</td><td>{String(r.active)}</td><td>{String(r.kill_switch)}</td><td>{String(r.kill_until || '')}</td></tr>)}</tbody></table></section>)}
    {tab === 'feedback' && (<section><h2>Feedback inbox</h2><p>Fed by creativehub.dev/feedback once that page is built — currently 404, so this will be empty until then.</p><table><thead><tr><th>Extension</th><th>Browser</th><th>Type</th><th>Message</th><th>When</th></tr></thead><tbody>{feedback.map((r, i) => <tr key={i}><td>{name(String(r.app_key))}</td><td>{String(r.browser || '')}</td><td>{String(r.type || '')}</td><td>{String(r.message)}</td><td>{String(r.created_at || '')}</td></tr>)}</tbody></table></section>)}
    {tab === 'testers' && (<section><h2>Early-tester keys</h2><p>Enter a Pro key — only its hash is stored, never the raw key. Keys are no-strings, never tied to reviews.</p><form className="grid" onSubmit={e => { e.preventDefault(); post('/api/admin/testers', t); setT({ ...t, license_key: '' }); }}>
      <label>Extension<select value={t.app_key} onChange={e => setT({ ...t, app_key: e.target.value })}>{APPS.map(a => <option key={a[0]} value={a[0]}>{a[1]}</option>)}</select></label>
      <label>License key<input value={t.license_key} onChange={e => setT({ ...t, license_key: e.target.value })} /></label>
      <label>Note<input value={t.note} onChange={e => setT({ ...t, note: e.target.value })} /></label><button>Record hash</button></form>
      <table><thead><tr><th>Extension</th><th>Key hash (first 12)</th><th>Note</th></tr></thead><tbody>{testers.map((r, i) => <tr key={i}><td>{name(String(r.app_key))}</td><td>{String(r.license_key_hash).slice(0, 12)}…</td><td>{String(r.note || '')}</td></tr>)}</tbody></table></section>)}
  </main>);
}
