<script context="module" lang="ts">
  import type { definitions } from '$lib/types/supabase';

  import { supabase } from '$lib/utils/supabaseClient';
  export async function load({ params }: { params: { place_id: string } }) {
    const { data, error } = await supabase
      .from<definitions['users_to_places']>('users_to_places')
      .select('id, name, avatar_url, place_id, description')
      .eq('place_id', params.place_id);
    if (error) return { status: error.code, props: { error } };
    const users_in_place = data;
    const description = users_in_place.length
      ? users_in_place[0].description
      : '';
    return {
      status: 200,
      props: {
        placeInformation: {
          place_id: params.place_id,
          description,
          users_in_place
        }
      }
    };
  }
</script>

<script lang="ts">
  import { page } from '$app/stores';
  import { sessionStore } from '$lib/stores/sessionStore';
  import {
    type GetUserLocation,
    getUserLocation,
    setUserLocation
  } from '$lib/utils/getUserLocation';

  interface PlaceInformation {
    place_id: string;
    description: string;
    users_in_place: definitions['users_to_places'][];
  }

  export let placeInformation: PlaceInformation;
  /** Refresh the list of users in this location */
  async function refreshPlaceInformationUsersInPlace() {
    const { data, error } = await supabase
      .from<definitions['users_to_places']>('users_to_places')
      .select('id, name, avatar_url, place_id, description')
      .eq('place_id', placeInformation.place_id);
    const users_in_place = data as PlaceInformation['users_in_place'];
    placeInformation.users_in_place = users_in_place;
    if (error) return;
  }

  /** Is the current logged in user in this location? */
  $: userInPlace = placeInformation.users_in_place
    .map((user) => user.id)
    .includes($sessionStore?.id as string);

  const RESET_TO_BLANK_LOCATION = { places: { place_id: '', description: '' } };
  /** Returns the location to toggle to when the toggle is reset */
  async function getOldLocationToResetTo() {
    let oldLocation: GetUserLocation | undefined | null =
      await getUserLocation();
    const oldPlaceID = oldLocation?.places.place_id;
    return oldPlaceID === placeInformation.place_id
      ? RESET_TO_BLANK_LOCATION
      : oldLocation;
  }

  export async function toggleUserLocation() {
    const oldLocation = await getOldLocationToResetTo();
    if (!userInPlace) {
      setUserLocation(placeInformation.place_id);
      console.log(
        '🚀 ~ file: [placeInformation.place_id].svelte ~ line 67 ~ toggleUserLocation ~ place_id',
        placeInformation.place_id
      );
    } else {
      if (!oldLocation?.places.place_id) return;
      setUserLocation(oldLocation?.places.place_id);
      console.log(
        '🚀 ~ file: [place_id].svelte ~ line 71 ~ toggleUserLocation ~ oldLocation?.places.place_id',
        oldLocation?.places.place_id
      );
    }
  }
</script>

<svelte:head>
  <title>{placeInformation.description}</title>
  <meta
    name="description"
    content={`Users currently in ${placeInformation.description}`}
  />
</svelte:head>

<div class="hero min-h-screen-nav bg-base-200 text-base-content">
  <div class="hero-content flex-col">
    <div class="text-center">
      <h1 class="text-5xl font-bold">{placeInformation.description}</h1>
      <p class="py-6">
        Users currently in {placeInformation.description}
      </p>
      <!-- Add a toggle that I am currently in this location -->
      <div class="form-control">
        <label class="label cursor-pointer">
          <span class="label-text">
            I'm Currently in {placeInformation.description}
          </span>
          <input
            type="checkbox"
            class="toggle"
            bind:checked={userInPlace}
            on:click={toggleUserLocation}
          />
        </label>
      </div>
      <div class="form-control">
        <a href="/" class="btn btn-primary">Go Back To Map</a>
      </div>
    </div>
  </div>
</div>
<div class="hero min-h-screen bg-base-100">
  <div class="hero-content flex-row flex-wrap">
    {#each placeInformation.users_in_place as user_in_place}
      <div class="card flex-shrink-0  max-w-sm shadow-2xl bg-base-100">
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
