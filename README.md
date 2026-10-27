# Creative Hub Mission Control — scaffold (not yet deployed)

Location decision still needed: Extensions repo vs a new repo. This scaffold is
in the workspace only, nothing was pushed or deployed.

## What it is
Next.js admin for admin.creativehub.dev, 4 modules:
1. Store deployment matrix — Chrome / Edge / Firefox / Opera, per extension,
   per store: status, live version vs monorepo version, store URL, permission
   justification, Firefox source-bundle status. "Slot Locked" is internal only.
2. Remote control — public API route below, app-specific announcements only,
   no cross-promotion. No revokedKeys in public JSON. Kill-switch must have
   a killUntil expiry and must not block local Pro use.
3. Revenue — LemonSqueezy webhooks/API, server-side only. API key and webhook
   secret go in server env only, never in the repo or extensions. Show NET
   revenue (after refunds) toward $1,000. Pricing-phase switch needs a defined
   trigger; license checks must accept old lifetime + new subscription IDs.
4. Feedback inbox — fed by creativehub.dev/feedback?app=<app>. Tag = ?app=
   param + user-selected type. That page currently 404s — build it first.

## Public API (matches existing extension code)
Extensions fetch: GET /api/v1/extensions/{appKey}/control
Example appKeys: tabSaver, notionClipper, linkedinCrm, aiReply, ecomSpy,
ytPdfSummarizer, bugRecorder, jobAutofill, cookieSwitcher, sqlCopilot.
Response shape (public, no identifiers, no keys):
{"active": true, "announcement": null, "promo": null, "killSwitch": false,
 "killUntil": null, "freeLimitOverride": null}
Do NOT add revokedKeys here. Revocation = LemonSqueezy license validation.

## Auth (missing from the original plan — mandatory)
Admin UI must be behind login (you only), protected API routes, and
Supabase Row Level Security. Public /api/v1/* stays unauthenticated.
Secrets needed before deploy (via secure env, not chat):
ADMIN_PASSWORD, SUPABASE_URL, SUPABASE_SERVICE_KEY,
LEMONSQUEEZY_API_KEY, LEMONSQUEEZY_WEBHOOK_SECRET.

## Supabase tables (see schema.sql)
store_matrix, remote_control, lemon_orders, early_tester_keys, feedback.

## Deploy
Vercel (free tier) + Supabase (free tier) + Hostinger DNS for
admin.creativehub.dev. Supabase free projects can pause after inactivity
and webhook logs grow — add retention/pruning and exports.
