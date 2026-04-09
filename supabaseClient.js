// Initialize the Supabase client
const SUPABASE_URL = 'https://kkvsovrpqynbgyngylbt.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtrdnNvdnJwcXluYmd5bmd5bGJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU3Mjc3MTUsImV4cCI6MjA5MTMwMzcxNX0.dlAvPlHcJULe_EzLG0f1C7Jyxe4Gvb74mFKckczGXxw';

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
