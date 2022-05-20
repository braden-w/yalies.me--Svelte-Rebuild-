import type { Payload } from '$lib/LocationAutoComplete';
import type { definitions } from '$lib/supabase';
import { supabase } from '$lib/utils/supabaseClient';

interface TextToPlaceResponse {
  place_id: string | null;
  lat: number | null;
  lng: number | null;
}

async function geocodeAddress(address: string) {
  try {
    const requestString = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${import.meta.env.VITE_GOOGLE_MAP_KEY_SERVER}`;
    const response = await fetch(requestString);
    const data = await response.json();
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

async function getPlaceIdFromFacebook() {
  const { data } = await supabase
    .from<definitions['facebook']>('facebook')
    .select('*')
    .eq('year', '2022');
  return { data };
}

async function textAddressToPlace(
  address: string
): Promise<TextToPlaceResponse> {
  // Use Google Autocomplete API to get place_id, lat, and lng from the address
  const { data, error } = await geocodeAddress(address);
  if (error) return { place_id: null, lat: null, lng: null };
  const { results } = data;
  // Return the place_id and lat/lng of the first result
  return {
    place_id: results[0].place_id,
    lat: results[0].geometry.location.lat,
    lng: results[0].geometry.location.lng
  };
}

export async function get() {
  const textToPlaceResponse = await textAddressToPlace('Boston, MA, USA');
  return {
    status: 200,
    body: { textToPlaceResponse, data: await getPlaceIdFromFacebook() }
  };
}

export async function uploadPlaceToSupabase(payload: Payload) {
  const { error: errorPlaces } = await supabase.from('places').upsert(payload, {
    returning: 'minimal' // Don't return the value after inserting
  });
  if (errorPlaces) throw errorPlaces;
}
export async function uploadUserPlaceSelectionToSupabase(
  user_response_id: string | undefined,
  place_id: string
) {
  if (!user_response_id) return;
  const { error: errorUserIDtoPlaceID } = await supabase
    .from('user_responses')
    .upsert({ place_id, user_response_id }, { returning: 'minimal' });
  if (errorUserIDtoPlaceID) throw errorUserIDtoPlaceID;
}
