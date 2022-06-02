import type { definitionsJSON } from '$lib/types/definitionsJSON';
import { supabase } from '$lib/utils/supabaseClient';
import { writable, type Writable } from 'svelte/store';

export const facebook: Writable<definitionsJSON['facebook_to_places'][] | null> = writable(null);

export async function loadFacebook() {
  const { data } = await supabase
    .from<definitionsJSON['places_with_facebook']>('places_with_facebook')
    .select('place_id, description, lat, lng, people')
    .not('people', 'is', null);
  facebook.set(data);
}
