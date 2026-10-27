import { createHash } from 'crypto';
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
export async function GET() {
  const db = supabase();
  if (!db) return NextResponse.json({ rows: [], supabase: false });
  const { data } = await db.from('early_tester_keys').select('license_key_hash,app_key,note,issued_at').order('issued_at', { ascending: false }).limit(200);
  return NextResponse.json({ rows: data ?? [], supabase: true });
}
export async function POST(req: Request) {
  const db = supabase();
  if (!db) return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 });
  const body = await req.json();
  if (!body.license_key || !body.app_key) return NextResponse.json({ error: 'license_key and app_key required' }, { status: 400 });
  const hash = createHash('sha256').update(String(body.license_key)).digest('hex');
  const { error } = await db.from('early_tester_keys').upsert({ license_key_hash: hash, app_key: body.app_key, note: body.note || null }, { onConflict: 'license_key_hash' });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, note: 'Only the hash is stored — the raw key is never saved.' });
}
