<script context="module" lang="ts">
  import type { definitionsJSON } from '$lib/types/definitionsJSON';

  import { supabase } from '$lib/utils/supabaseClient';

  export interface PlaceInformation {
    place_id: string;
    description: string;
    users_in_place: definitionsJSON['users_facebook_places'][];
  }
  const desiredColumns: (keyof definitionsJSON['users_facebook_places'])[] = [
    'id',
    'name',
    'avatar_url',
    'place_id',
    'description'
  ];
  const selectQuery = '*';
  /** Function that matches query by place_id, description, and finally fuzzy description */
  async function getUsersInPlace(query: string): Promise<
    | {
        data: definitionsJSON['users_facebook_places'][] | null;
        redirect: null;
      }
    | {
        data: null;
        redirect: { status: number; redirect?: string };
      }
  > {
    // Attempt to match the query by place_id
    const { data: dataMatchPlaceID, error: errorMatchPlaceID } = await supabase
      .from<definitionsJSON['users_facebook_places']>('users_facebook_places')
      .select(selectQuery)
      .eq('place_id', query);
    if (errorMatchPlaceID) console.log(errorMatchPlaceID);
    if (dataMatchPlaceID?.length !== 0)
      return { data: dataMatchPlaceID, redirect: null };

    // Attempt to match the query by place description
    const {
      data: dataMatchPlaceDescription,
      error: errorMatchPlaceDescription
    } = await supabase
      .from<definitionsJSON['users_facebook_places']>('users_facebook_places')
      .select(selectQuery)
      .eq('description', query);
    if (errorMatchPlaceDescription) console.log(errorMatchPlaceDescription);
    if (dataMatchPlaceDescription?.length !== 0)
      return { data: dataMatchPlaceDescription, redirect: null };

    // Attempt to fuzzy match the query by place_description
    const {
      data: dataFuzzyMatchPlaceDescription,
      error: errorFuzzyMatchPlaceDescription
    } = await supabase
      .from<definitionsJSON['users_facebook_places']>('users_facebook_places')
      .select(selectQuery)
      .ilike('description', `%${query}%`);
    if (errorFuzzyMatchPlaceDescription)
      console.log(errorFuzzyMatchPlaceDescription);
    if (
      dataFuzzyMatchPlaceDescription &&
      dataFuzzyMatchPlaceDescription?.length !== 0
    ) {
      const redirect = {
        status: 302,
        redirect: `${dataFuzzyMatchPlaceDescription[0].description}`
      };
      return { data: null, redirect };
    }
    const redirect = { status: 404 };
    return { data: null, redirect };
  }

  export async function load({ params }: { params: { place_id: string } }) {
    const { data: users_in_place, redirect } = await getUsersInPlace(
      params.place_id
    );
    if (redirect) return redirect;
    const place_id = users_in_place?.length
      ? users_in_place[0].place_id
      : params.place_id;
    const description = users_in_place?.length
      ? users_in_place[0].description
      : '';
    return {
      status: 200,
      props: {
        placeInformation: {
          place_id,
          description,
          users_in_place
        }
      }
    };
  }
</script>

<script lang="ts">
  import ProfileIcon from '../../lib/components/icons/EditProfileIcon.svelte';

  import CarouselOfUsers from '../../lib/components/CarouselOfUsers.svelte';

  import TableOfUsers from '$lib/components/TableOfUsers.svelte';

  import PlaceCheckbox from './PlaceCheckbox.svelte';
  import MapIcon from '$lib/components/icons/MapIcon.svelte';
  import LocationsListIcon from '$lib/components/icons/LocationsListIcon.svelte';

  export let placeInformation: PlaceInformation;
  async function refreshUsersInPlace() {
    const { data: users_in_place, error } = await supabase
      .from<definitionsJSON['users_facebook_places']>('users_facebook_places')
      .select(selectQuery)
      .eq('place_id', placeInformation.place_id);
    if (error) console.log(error);
    placeInformation.users_in_place = users_in_place!;
  }
</script>

<svelte:head>
  <title>{placeInformation.description}</title>
  <meta
    name="description"
    content={`Users currently in ${placeInformation.description}`}
  />
</svelte:head>

<div class="flex flex-row">
  <a href="/map" class="btn btn-ghost btn-xs shrink grow basis-0">
    <MapIcon /> Map
  </a>
  <div class="divider divider-horizontal" />
  <a href="/locations" class="btn btn-ghost btn-xs shrink grow basis-0">
    <LocationsListIcon /> Locations
  </a>
</div>
<div class="min-h-screen-nav hero bg-base-200 text-base-content">
  <div class="hero-content flex-col">
    <div class="text-center">
      <h1 class="text-5xl font-bold">{placeInformation.description}</h1>
      <p class="py-6">
        {placeInformation.users_in_place.length} users currently in {placeInformation.description}
      </p>
      <!-- Add a carousel with users -->
      <CarouselOfUsers users={placeInformation.users_in_place} />
      <!-- Add a toggle that I am currently in this location -->
      <PlaceCheckbox {placeInformation} on:toggled={refreshUsersInPlace} />
      <div class="form-control">
        <div class="divider" />
        <a href="/profile" class="btn btn-primary">
          <ProfileIcon />
          Edit My Profile</a
        >
      </div>
    </div>
  </div>
</div>
<div class="hero min-h-screen bg-base-100">
  <div class="hero-content w-full flex-row flex-wrap">
    <div class="w-full">
      <h1 class="text-5xl font-bold">
        Users in {placeInformation.description}
      </h1>
      <p class="py-6">
        {placeInformation.users_in_place.length} users currently in {placeInformation.description}
      </p>
    </div>
    <div class="w-full overflow-x-auto">
      <TableOfUsers users={placeInformation.users_in_place} />
    </div>
  </div>
</div>
