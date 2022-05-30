import type { definitions } from '$lib/types/supabase';
import { sessionStore } from '$lib/stores/sessionStore';
import { supabase } from '$lib/utils/supabaseClient';
import { derived, get, writable, type Writable } from 'svelte/store';

export interface GetUserLocation {
  place_id: string;
  description: string;
}

/** Refreshes the location store */
export async function refreshUserLocation(): Promise<
  definitions['users_facebook_places'] | null
> {
  const { data, error } = await supabase
    .from<definitions['users_facebook_places']>('users_facebook_places')
    .select('place_id, description')
    .eq('user_response_id', get(sessionStore)?.user_response_id)
    .maybeSingle();
  if (data && data.place_id && data.description) {
    userLocationStore.set({
      place_id: data.place_id,
      description: data.description
    });
    return data;
  }
  if (error) {
    console.error(error);
    userLocationStore.set(null);
  }
  return null;
}

export async function resetUserLocation(): Promise<void> {
  const { data, error } = await supabase
    .from<definitions['user_responses']>('user_responses')
    .update({
      place_id: null
    })
    .eq('user_response_id', get(sessionStore)?.user_response_id);
  console.log(
    '🚀 ~ file: UserLocationStore.ts ~ line 35 ~ resetUserLocation ~ data',
    data
  );
  if (error) {
    console.error(error);
  }
  userLocationStore.set(null);
}

/** Updates the place_id in the user_responses table based off the user's user_response_id */
export async function setUserLocation(
  place_id: string,
  description: string
): Promise<void> {
  const { error } = await supabase
    .from<definitions['user_responses']>('user_responses')
    .update({
      place_id: place_id
    })
    .eq('user_response_id', get(sessionStore)?.user_response_id);
  if (error) {
    console.error(error);
  }
  userLocationStore.set({ place_id, description });
}

export const userLocationStore: Writable<GetUserLocation | null> =
  writable(null);

// Create a derived store that gets the place_id and description from the $sessionStore
export const derivedUserLocationStore = derived(
  sessionStore,
  ($sessionStore) => {
    $sessionStore?.place_id, $sessionStore?.description;
  }
);
