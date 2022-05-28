<script context="module" lang="ts">
  import type { definitions } from '$lib/types/supabase';

  import { supabase } from '$lib/utils/supabaseClient';

  export interface PlaceInformation {
    place_id: string;
    description: string;
    users_in_place: definitions['users_to_places'][];
  }

  export async function load({ params }: { params: { place_id: string } }) {
    const { data: users_in_place, error } = await supabase
      .from<definitions['users_to_places']>('users_to_places')
      .select('id, name, avatar_url, place_id, description')
      .eq('place_id', params.place_id);
    if (error) return { status: error.code, props: { error } };
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

<div class="hero min-h-screen-nav bg-base-200 text-base-content">
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
    <div class="overflow-x-auto w-full">
      <table class="table w-full">
        <!-- head -->
        <thead>
          <tr>
            <th>
              <label>
                <input type="checkbox" class="checkbox" />
              </label>
            </th>
            <th>Name</th>
            <th>Job</th>
            <th>Favorite Color</th>
            <th />
          </tr>
        </thead>
        <tbody>
          <!-- row 1 -->
          {#each placeInformation.users_in_place as user_in_place}
            <tr>
              <th>
                <label>
                  <input type="checkbox" class="checkbox" />
                </label>
              </th>
              <td>
                <div class="flex items-center space-x-3">
                  <div class="avatar">
                    <div class="mask mask-squircle w-12 h-12">
                      <img
                        src={user_in_place.avatar_url}
                        alt="User Profile"
                        referrerpolicy="no-referrer"
                      />
                    </div>
                  </div>
                  <div>
                    <div class="font-bold">{user_in_place.name}</div>
                    <div class="text-sm opacity-50">{user_in_place.id}</div>
                  </div>
                </div>
              </td>
              <td>
                Zemlak, Daniel and Leannon
                <br />
                <span class="badge badge-ghost badge-sm"
                  >Desktop Support Technician</span
                >
              </td>
              <td>Purple</td>
              <th>
                <a
                  href={`/users/${user_in_place.id}`}
                  class="btn btn-ghost btn-xs"
                >
                  details
                </a>
              </th>
            </tr>
          {/each}
        </tbody>
        <!-- foot -->
        <tfoot />
      </table>
    </div>
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
