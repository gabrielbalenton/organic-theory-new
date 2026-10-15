// The Organic Theory internal dashboard is intentionally unprotected.
// Keep this helper as the task API's single access hook so the route can
// be re-protected later without touching task storage code.
// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
export function isInternalAuthorized(_req?: any) {
  return true;
}
