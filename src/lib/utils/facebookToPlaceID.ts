import type {Payload} from "$lib/LocationAutoComplete";
import type {definitions} from "$lib/supabase";
import {supabase} from "$lib/utils/supabaseClient";

async function getPlaceIdFromFacebook() {
  const {data} = await supabase.from<definitions['facebook']>('facebook').select('*');
  const firstResult = data?.[0];
}




export async function uploadPlaceToSupabase(payload: Payload) {
  const {error: errorPlaces} = await supabase.from('places').upsert(payload, {
    returning: 'minimal' // Don't return the value after inserting
  });
  if (errorPlaces) throw errorPlaces;
}
export async function uploadUserPlaceSelectionToSupabase(
  user_response_id: string | undefined,
  place_id: string
) {
  if (!user_response_id) return;
  const {error: errorUserIDtoPlaceID} = await supabase
    .from('user_responses')
    .upsert({place_id, user_response_id}, {returning: 'minimal'});
  if (errorUserIDtoPlaceID) throw errorUserIDtoPlaceID;
}