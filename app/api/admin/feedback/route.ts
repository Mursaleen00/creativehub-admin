import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
export async function GET() {
  const db = supabase();
  if (!db) return NextResponse.json({ rows: [], supabase: false });
  const { data } = await db.from('feedback').select('*').order('created_at', { ascending: false }).limit(200);
  return NextResponse.json({ rows: data ?? [], supabase: true });
}
