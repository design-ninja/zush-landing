export const SUPABASE_URL =
  import.meta.env.PUBLIC_SUPABASE_URL ||
  import.meta.env.VITE_SUPABASE_URL ||
  'https://sjzrgmvinyxjzvshfvjy.supabase.co';

// Public anon JWT for Edge Functions that keep verify_jwt enabled. It grants
// only the anon role; never put a service-role key here.
export const SUPABASE_ANON_KEY: string = import.meta.env.PUBLIC_SUPABASE_ANON_KEY ?? '';
