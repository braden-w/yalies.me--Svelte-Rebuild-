import type { definitions } from '$lib/supabase';
import { sessionStore } from '$lib/utils/sessionStore';
import { supabase } from '$lib/utils/supabaseClient';
import { get } from 'svelte/store';

interface GetUserLocation {
  user_responses: { places: { place_id: string; description: string } };
}

/**Gets user location and returns place_id and description */
export async function getUserLocation(): Promise<GetUserLocation | undefined> {
  const { data, error } = await supabase
    .from<definitions['users']>('users')
    .select('user_responses(places(place_id, description))')
    .eq('id', get(sessionStore)?.id)
    .maybeSingle();
  if (data) {
    const typed_data = data as unknown as GetUserLocation;
    return typed_data;
  }
  if (error) {
    console.error(error);
  }
}
