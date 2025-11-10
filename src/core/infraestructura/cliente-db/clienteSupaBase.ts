import { createClient } from '@supabase/supabase-js';

const { supabaseUrl, supabaseKey } = configuracion;

export const supabase = createClient(
    supabaseUrl,
    supabaseKey
);
