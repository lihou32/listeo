import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://xeprqctiyorslkfmxxlg.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhlcHJxY3RpeW9yc2xrZm14eGxnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ1NjUzNDMsImV4cCI6MjA5MDE0MTM0M30.XLDmI8nHiS6Y66xsf7ywk9cUuWJY6bqmFg4_3yoDA3w'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
