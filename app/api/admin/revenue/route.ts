import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
export async function GET() {
  const db = supabase();
  if (!db) return NextResponse.json({ net_cents: 0, orders: 0, supabase: false, lemon: false });
  const { data } = await db.from('lemon_orders').select('gross_cents,refunded_cents');
  const rows = data ?? [];
  const net = rows.reduce((s, r) => s + (r.gross_cents || 0) - (r.refunded_cents || 0), 0);
  return NextResponse.json({ net_cents: net, orders: rows.length, supabase: true, lemon: !!process.env.LEMONSQUEEZY_API_KEY, goal_cents: 100000, note: process.env.LEMONSQUEEZY_API_KEY ? 'LemonSqueezy key set — webhook/API sync not yet wired.' : 'LemonSqueezy not verified yet — revenue module is a placeholder until its API key is set.' });
}
