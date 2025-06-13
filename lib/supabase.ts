import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ehzhchnqlbbqwhnorqqs.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVoemhjaG5xbGJicXdobm9ycXFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk4MDQ2NzAsImV4cCI6MjA2NTM4MDY3MH0.Rjz6qQFC1N5S-vvqpTPrVuh9As308VJ9I-OZbl2L4CI";
export const supabase = createClient(supabaseUrl, supabaseKey);
