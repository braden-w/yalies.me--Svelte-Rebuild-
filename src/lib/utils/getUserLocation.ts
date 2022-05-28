import type { definitions } from '$lib/types/supabase';
import { sessionStore } from '$lib/stores/sessionStore';
import { supabase } from '$lib/utils/supabaseClient';
import { get } from 'svelte/store';

interface GetUserLocation {
  places: { place_id: string; description: string };
}

/** Gets user location and returns place_id and description */
export async function getUserLocation(): Promise<GetUserLocation | undefined> {
  const { data, error } = await supabase
    .from<definitions['user_responses']>('user_responses')
    .select('places(place_id, description)')
    .eq('user_response_id', get(sessionStore)?.user_response_id)
    .maybeSingle();
  if (data) {
    const typed_data = data as unknown as GetUserLocation;
    return typed_data;
  }
  if (error) {
    console.error(error);
  }
}

/** Updates the place_id in the user_responses table based off the */
export async function setUserLocation(place_id: string) {
  const { data, error } = await supabase
    .from<definitions['user_responses']>('user_responses').update({
      place_id: place_id
    }).eq('user_response_id', get(sessionStore)?.user_response_id);
  if (error) {
    console.error(error);
  }
}