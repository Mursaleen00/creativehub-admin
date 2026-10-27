import { createClient, SupabaseClient } from '@supabase/supabase-js';
let client: SupabaseClient | null = null;
export function supabase(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  if (!client) client = createClient(url, key, { auth: { persistSession: false } });
  return client;
}
export const APPS = [
  ['tabSaver','TabPress'],['notionClipper','ClipPress'],['linkedinCrm','LeadPress'],
  ['aiReply','ReplyPress'],['ecomSpy','SellerPress'],['ytPdfSummarizer','SumPress'],
  ['bugRecorder','BugPress'],['jobAutofill','HirePress'],['cookieSwitcher','SessionPress'],
  ['sqlCopilot','QueryPress'],
] as const;
export const STORES = ['chrome','edge','firefox','opera'] as const;
