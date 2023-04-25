import { createClient } from '@supabase/supabase-js';

const URL = "https://qmkzpqluiefnxycjcyqy.supabase.co";

const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFta3pwcWx1aWVmbnh5Y2pjeXF5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODE5NDU0MzMsImV4cCI6MTk5NzUyMTQzM30.uPtPJFE1MG8N_0bIwGCsUx3UBRa-9jsgswAJsJnMyKY";


export const supabase = createClient(URL, API_KEY);
