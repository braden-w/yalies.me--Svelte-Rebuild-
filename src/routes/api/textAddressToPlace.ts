import type {Payload} from "$lib/LocationAutoComplete";
import type {definitions} from "$lib/supabase";
import {supabase} from "$lib/utils/supabaseClient";

async function getPlaceIdFromFacebook() {
  const {data} = await supabase.from<definitions['facebook']>('facebook').select('*');
  const firstResult = data?.[0];
}

async function textAddressToPlace(address: string) {
  try {
    // Use Google Autocomplete API to get place_id, lat, and lng from the address
    const requestString = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${import.meta.env.VITE_GOOGLE_MAP_KEY_SERVER}`
    const response = await fetch(requestString);
    const {results} = await response.json();
    // Return the place_id and lat/lng of the first result
    return {
      place_id: results[0].place_id,
      lat: results[0].geometry.location.lat,
      lng: results[0].geometry.location.lng,
    }
  }
  catch (error) {
    console.error(error);
    return {
      place_id: null,
      lat: null,
      lng: null,
    }
  }
}


export async function get() {
  const res = await textAddressToPlace("Boston, MA, USA");
  return {status: 200, body: res};
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