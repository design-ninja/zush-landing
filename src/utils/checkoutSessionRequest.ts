// The database runs in ap-south-1 (Mumbai). Supabase runs an Edge Function in the
// region nearest the caller unless the request names one, and
// create-paddle-checkout-session makes about ten sequential database round trips, so
// buyers in the US and Europe waited 2–4 s on the network alone. `forceFunctionRegion`
// is the query-parameter form of `x-region`, which keeps the request free of a CORS
// preflight: https://supabase.com/docs/guides/functions/regional-invocation
export const CHECKOUT_FUNCTION_REGION = "ap-south-1";

export function checkoutSessionUrl(supabaseUrl: string, pinRegion: boolean): string {
  const url = `${supabaseUrl}/functions/v1/create-paddle-checkout-session`;
  return pinRegion ? `${url}?forceFunctionRegion=${CHECKOUT_FUNCTION_REGION}` : url;
}

// A pinned request is not re-routed when its region is unavailable, so a gateway
// error from the pinned attempt is retried in the caller's nearest region. Other
// HTTP errors come from the function itself and would repeat there.
export function isPinnedRegionUnavailable(status: number): boolean {
  return status === 502 || status === 503 || status === 504;
}
