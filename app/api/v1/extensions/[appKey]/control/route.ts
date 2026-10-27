export async function GET(_req, { params }) {
  // Public, no identifiers, no license keys. Auth lives on admin pages only.
  // TODO: read remote_control row for params.appKey from Supabase; fall back to safe defaults.
  return Response.json({
    active: true,
    announcement: null,
    promo: null,
    killSwitch: false,
    killUntil: null,
    freeLimitOverride: null,
  });
}
