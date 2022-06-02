import type { definitionsJSON } from '$lib/types/definitionsJSON';
import { supabase } from '$lib/utils/supabaseClient';

export async function get() {
  const { data, error } = await supabase
    .from<definitionsJSON['users_facebook_places']>('users_facebook_places')
    .select('*');
  if (error) return { status: 404, body: error };

  return {
    status: 200,
    body: data,
  };
}
