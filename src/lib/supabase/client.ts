import { createBrowserClient } from '@supabase/ssr';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://qbvhlnhvkzblnvukphxh.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFidmhsbmh2a3pibG52dWtwaHhoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYyNjE3NzYsImV4cCI6MjEwMTgzNzc3Nn0.P2wCBAWatsvY9yLem91ylQ_TM-Jg49gaEg8t8vvXfoA";

export function createClient() {
  return createBrowserClient(
    supabaseUrl,
    supabaseAnonKey
  );
}
