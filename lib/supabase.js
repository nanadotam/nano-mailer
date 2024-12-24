import { createClient } from '@supabase/supabase-js'

// For development/testing, you can use these demo credentials
const supabaseUrl = 'https://demo.supabase.com'
const supabaseKey = 'demo-key'

export const supabase = createClient(supabaseUrl, supabaseKey) 