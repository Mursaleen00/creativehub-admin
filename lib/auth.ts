import { createHash } from 'crypto';
import { cookies } from 'next/headers';
export function sessionToken(): string | null {
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw) return null;
  return createHash('sha256').update(pw).digest('hex');
}
export async function isAuthed(): Promise<boolean> {
  const tok = sessionToken();
  if (!tok) return false;
  const c = await cookies();
  return c.get('admin_session')?.value === tok;
}
