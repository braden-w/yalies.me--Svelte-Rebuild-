<script context="module" lang="ts">
  import type { definitions } from '$lib/types/supabase';

  import { supabase } from '$lib/utils/supabaseClient';

  export interface PlaceInformation {
    place_id: string;
    description: string;
    users_in_place: definitions['users_to_places'][];
  }

  /** Function that matches query by place_id, description, and finally fuzzy description */
  async function getUsersInPlace(query: string): Promise<
    | { data: definitions['users_to_places'][] | null; redirect: null }
    | {
        data: null;
        redirect: { status: number; redirect?: string };
      }
  > {
    // Attempt to match the query by place_id
    const { data: dataMatchPlaceID, error: errorMatchPlaceID } = await supabase
      .from<definitions['users_to_places']>('users_to_places')
      .select('id, name, avatar_url, place_id, description')
      .eq('place_id', query);
    if (errorMatchPlaceID) console.log(errorMatchPlaceID);
    if (dataMatchPlaceID?.length !== 0)
      return { data: dataMatchPlaceID, redirect: null };

    // Attempt to match the query by place description
    const {
      data: dataMatchPlaceDescription,
      error: errorMatchPlaceDescription
    } = await supabase
      .from<definitions['users_to_places']>('users_to_places')
      .select('id, name, avatar_url, place_id, description')
      .eq('description', query);
    if (errorMatchPlaceDescription) console.log(errorMatchPlaceDescription);
    if (dataMatchPlaceDescription?.length !== 0)
      return { data: dataMatchPlaceDescription, redirect: null };

    // Attempt to fuzzy match the query by place_description
    const {
      data: dataFuzzyMatchPlaceDescription,
      error: errorFuzzyMatchPlaceDescription
    } = await supabase
      .from<definitions['users_to_places']>('users_to_places')
      .select('id, name, avatar_url, place_id, description')
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
  import TableOfUsers from '$lib/components/TableOfUsers.svelte';

  import PlaceCheckbox from './PlaceCheckbox.svelte';

  export let placeInformation: PlaceInformation;
  async function refreshUsersInPlace() {
    const { data: users_in_place, error } = await supabase
      .from<definitions['users_to_places']>('users_to_places')
      .select('id, name, avatar_url, place_id, description')
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

<div class="min-h-screen-nav hero bg-base-200 text-base-content">
  <div class="hero-content flex-col">
    <div class="text-center">
      <h1 class="text-5xl font-bold">{placeInformation.description}</h1>
      <p class="py-6">
        Users currently in {placeInformation.description}
      </p>
      <!-- Add a toggle that I am currently in this location -->
      <PlaceCheckbox {placeInformation} on:toggled={refreshUsersInPlace} />
      <div class="form-control">
        <a href="/map" class="btn btn-primary">Go Back To Map</a>
      </div>
    </div>
  </div>
</div>
<div class="hero min-h-screen bg-base-100">
  <div class="hero-content flex-row flex-wrap">
    <div class="w-full overflow-x-auto">
      <TableOfUsers users={placeInformation.users_in_place} />
    </div>
    {#each placeInformation.users_in_place as user_in_place}
      <div class="card max-w-sm  flex-shrink-0 bg-base-100 shadow-2xl">
        <div class="card-body">
          <div class="text-center">
            <div class="avatar mx-auto">
              <div class="w-28 rounded">
                <img
                  src={user_in_place.avatar_url}
                  alt="Profile"
                  width="100%"
                  height="100%"
                  referrerpolicy="no-referrer"
                />
              </div>
            </div>
            <h1 class="text-2xl font-bold">{user_in_place.name}</h1>
            <p class="text-lg">Yale University</p>
          </div>

          <div class="form-control mt-6">
            <a href={`/users/${user_in_place.id}`} class="btn btn-primary">
              Go to Profile
            </a>
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>
