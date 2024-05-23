import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://nhpmbvwbprsuwjkodyzy.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ocG1idndicHJzdXdqa29keXp5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ1MzkxOTcsImV4cCI6MjAzMDExNTE5N30.KPfc2Rff5wwB74t88o4rNSxZ4P_qfHAmSzAhmM7dvnI";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
