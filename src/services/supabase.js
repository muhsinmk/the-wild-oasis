import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://mdtwhmfdnxmzoktmfzab.supabase.co";

const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1kdHdobWZkbnhtem9rdG1memFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg1NDgyMTcsImV4cCI6MjAxNDEyNDIxN30.1KG_8Rvw0cpBju0FjZcLqfAKD-DRZuzt4Kge5j6C884";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
