import type { definitionsJSON } from '$lib/types/definitionsJSON';
import createStore from '$lib/utils/createStore';
import { supabase } from '$lib/utils/supabaseClient';
import { get, type Writable } from 'svelte/store';

export async function refreshProfileStore(
  queryId: string | undefined = undefined
) {
  const id = queryId ?? get(profileStore)?.id;
  if (!id) throw new Error('No ID provided to refresh user data');
  const { data, error } = await supabase
    .from<definitionsJSON['users_facebook_places']>('users_facebook_places')
    .select('*')
    .eq('id', id)
    .maybeSingle();
  if (data) {
    console.log(
      '🚀 ~ file: profileStore.ts ~ line 8 ~ refreshProfileStore ~ data',
      data
    );
    profileStore.set(data);
    return data;
  }
  if (error) {
    console.error(error);
    profileStore.set(null);
  }
  return null;
}

/** Updates User Responses with the payload on the user that matches user_response_id. Refreshes profileStore after completion */
export async function uploadUserResponses(
  payload: definitionsJSON['user_responses'],
  user_response_id = get(profileStore)?.user_response_id
) {
  const { data, error } = await supabase
    .from<definitionsJSON['user_responses']>('user_responses')
    .update(payload)
    .eq('user_response_id', user_response_id);

  if (data) {
    console.log(
      '🚀 ~ file: profileStore.ts ~ line 30 ~ uploadStoreToSupabase ~ data',
      data
    );
    return await refreshProfileStore();
  }
  if (error) {
    console.error(error);
  }
  return null;
}

export const profileStore: Writable<
  definitionsJSON['users_facebook_places'] | null
> = createStore<definitionsJSON['users_facebook_places'] | null>(
  'yalies.me-profileStore',
  null
);

/** Updates the place_id in the user_responses table based off the user's user_response_id */
export async function setUserLocation(
  place_id: string | undefined | null
){
  const { error } = await supabase
    .from<definitionsJSON['user_responses']>('user_responses')
    .update({
      place_id: place_id
    })
    .eq('user_response_id', get(profileStore)?.user_response_id);
  if (error) {
    console.error(error);
  }
  return refreshProfileStore();
}
