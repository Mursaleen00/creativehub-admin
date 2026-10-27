import { createHash } from 'crypto';
import { NextResponse } from 'next/server';
export async function POST(req: Request) {
  const { password } = await req.json().catch(() => ({}));
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw || password !== pw) return NextResponse.json({ error: 'wrong password' }, { status: 401 });
  const res = NextResponse.json({ ok: true });
  res.cookies.set('admin_session', createHash('sha256').update(pw).digest('hex'), { httpOnly: true, path: '/', sameSite: 'lax', secure: process.env.NODE_ENV === 'production', maxAge: 60 * 60 * 24 * 7 });
  return res;
}
