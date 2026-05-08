import { createClient } from "@supabase/supabase-js";
import "server-only";

export function createServerClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Brak zmiennych środowiskowych NEXT_PUBLIC_SUPABASE_URL lub NEXT_PUBLIC_SUPABASE_ANON_KEY. " +
      "Sprawdź konfigurację w Vercel → Settings → Environment Variables."
    );
  }

  return createClient(supabaseUrl, supabaseAnonKey);
}
