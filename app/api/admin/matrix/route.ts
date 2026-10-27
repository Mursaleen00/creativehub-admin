import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
export async function GET() {
  const db = supabase();
  if (!db) return NextResponse.json({ rows: [], supabase: false });
  const { data } = await db.from('store_matrix').select('*').order('app_key').order('store');
  return NextResponse.json({ rows: data ?? [], supabase: true });
}
export async function POST(req: Request) {
  const db = supabase();
  if (!db) return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 });
  const body = await req.json();
  const { error } = await db.from('store_matrix').upsert({ app_key: body.app_key, store: body.store, status: body.status, live_version: body.live_version || null, monorepo_version: body.monorepo_version || null, store_url: body.store_url || null, permission_justification: body.permission_justification || null, firefox_source_bundle_status: body.firefox_source_bundle_status || null }, { onConflict: 'app_key,store' });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
