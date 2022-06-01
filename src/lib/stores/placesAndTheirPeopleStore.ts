import type { definitionsJSON } from '$lib/types/definitionsJSON';
import createStore from '$lib/utils/createStore';
import { supabase } from '$lib/utils/supabaseClient';


export async function refreshPlacesAndTheirPeopleStore() {
      const { data: places, error } = await supabase
      .from<definitionsJSON['places_with_people']>('places_with_people')
      .select('*')
      .not('people', 'is', null);
  if (places) {
    console.log("🚀 ~ file: placesAndTheirPeopleStore.ts ~ line 14 ~ refreshProfileStore ~ places", places)
    placesAndTheirPeopleStore.set(places);
    return places;
  }
  if (error) {
    console.error(error);
    placesAndTheirPeopleStore.set(null);
  }
  return null;
}

/** A store that lists places and their people. 
 * Lists all places with people, and their corresponding people.
*/
export const placesAndTheirPeopleStore: Writable<
      definitionsJSON['places_with_people'] | null
> = createStore<definitionsJSON['places_with_people'] | null>(
  'yalies.me-placesAndTheirPeopleStore',
  null
);
