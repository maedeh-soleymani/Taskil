import {createClient} from "@supabase/supabase-js"

const supabaseUrl = "https://chwwzfvsylrtpgzclgzx.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNod3d6ZnZzeWxydHBnemNsZ3p4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQxOTg0NzEsImV4cCI6MjA4OTc3NDQ3MX0.eEUadgQAK4nNVl0x5IzNBlocteR9MVJjnaCa7hvhaB4";


export const supabase =  createClient (supabaseUrl, supabaseKey)