import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://evgskaaowcwlajlotcxa.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV2Z3NrYWFvd2N3bGFqbG90Y3hhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA5MDczNDMsImV4cCI6MjA3NjQ4MzM0M30.bVywkpS15S-3wb-3SBZvA6oYvSDAfUc2X2cTROBiNmA";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
