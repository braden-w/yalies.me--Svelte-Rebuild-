import type { definitions } from '$lib/types/supabase';
import { sessionStore } from '$lib/stores/sessionStore';
import { supabase } from '$lib/utils/supabaseClient';
import { get, writable, type Writable } from 'svelte/store';

export interface GetUserLocation {
  places: { place_id: string | null; description: string };
}

/** Gets user location and returns place_id and description */
export async function refreshUserLocation(): Promise<GetUserLocation | null> {
  const { data, error } = await supabase
    .from<definitions['user_responses']>('user_responses')
    .select('places(place_id, description)')
    .eq('user_response_id', get(sessionStore)?.user_response_id)
    .maybeSingle();
  if (data) {
    const typed_data = data as unknown as GetUserLocation;
    userLocationStore.set(typed_data);
    return typed_data;
  }
  if (error) {
    console.error(error);
  }
  userLocationStore.set(null);
  return null;
}

/** Updates the place_id in the user_responses table based off the user's user_response_id */
export async function setUserLocation(place_id: string | null) {
  const { error } = await supabase
    .from<definitions['user_responses']>('user_responses')
    .update({
      place_id: place_id
    })
    .eq('user_response_id', get(sessionStore)?.user_response_id);
  if (error) {
    console.error(error);
  }
}

export const userLocationStore: Writable<GetUserLocation | null> =
  writable(null);
