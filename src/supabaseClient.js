import { createClient } from '@supabase/supabase-js';

// Memanggil variabel environment dari file .env (Format Vite)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Membuat instance koneksi ke database Supabase
export const supabase = createClient(supabaseUrl, supabaseKey);