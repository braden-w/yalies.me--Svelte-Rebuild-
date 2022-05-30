import type {definitions} from '$lib/types/supabase';
import { supabase } from '$lib/utils/supabaseClient';

export async function get() {
  const {data, error } = await supabase.from<definitions['users_facebook_places']>('users_facebook_places').select('*')
  if (error)
    return {status: 404, body: error};

  return {
    status: 200,
    body: data
  };
}