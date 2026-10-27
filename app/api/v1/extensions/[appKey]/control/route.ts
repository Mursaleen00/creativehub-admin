export async function GET() {
  return Response.json({
    active: true,
    announcement: null,
    promo: null,
    killSwitch: false,
    killUntil: null,
    freeLimitOverride: null,
  });
}
