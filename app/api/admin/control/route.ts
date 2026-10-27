import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
export async function GET() {
  const db = supabase();
  if (!db) return NextResponse.json({ rows: [], supabase: false });
  const { data } = await db.from('remote_control').select('*').order('app_key');
  return NextResponse.json({ rows: data ?? [], supabase: true });
}
export async function POST(req: Request) {
  const db = supabase();
  if (!db) return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 });
  const body = await req.json();
  const { error } = await db.from('remote_control').upsert({ app_key: body.app_key, active: body.active !== false, announcement: body.announcement || null, promo: body.promo || null, kill_switch: !!body.kill_switch, kill_until: body.kill_until || null, free_limit_override: body.free_limit_override ? Number(body.free_limit_override) : null }, { onConflict: 'app_key' });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
