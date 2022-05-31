import type { definitions } from '$lib/types/supabase';
import createStore from '$lib/utils/createStore';
import { supabase } from '$lib/utils/supabaseClient';
import { get, type Writable } from 'svelte/store';

export async function refreshProfileStore(queryId: string | undefined) {
  const id = queryId ?? get(profileStore)?.id;
  if (!id) throw new Error('No ID provided to refresh user data');
  const { data, error } = await supabase
    .from<definitions['users_facebook_places']>('users_facebook_places')
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
  payload: definitions['user_responses'], user_response_id = get(profileStore)?.user_response_id
) {
  const { data, error } = await supabase
    .from<definitions['user_responses']>('user_responses')
    .update(payload)
    .eq('user_response_id', user_response_id)
    
  if (data) {
    console.log(
      '🚀 ~ file: profileStore.ts ~ line 30 ~ uploadStoreToSupabase ~ data',
      data
    );
    return await refreshProfileStore(undefined);
  }
  if (error) {
    console.error(error);
  }
  return null;
}

export const profileStore: Writable<
  definitions['users_facebook_places'] | null
> = createStore<definitions['users_facebook_places'] | null>(
  'yalies.me-profileStore',
  null
);
