import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
export async function GET(_req: Request, ctx: { params: Promise<{ appKey: string }> }) {
  const { appKey } = await ctx.params;
  const db = supabase();
  if (db) {
    const { data } = await db.from('remote_control').select('*').eq('app_key', appKey).maybeSingle();
    if (data) return NextResponse.json({ active: data.active, announcement: data.announcement, promo: data.promo, killSwitch: data.kill_switch, killUntil: data.kill_until, freeLimitOverride: data.free_limit_override });
  }
  return NextResponse.json({ active: true, announcement: null, promo: null, killSwitch: false, killUntil: null, freeLimitOverride: null });
}
