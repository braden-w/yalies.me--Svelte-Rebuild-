<script context="module" lang="ts">
  import type { definitions } from '$lib/supabase';

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
  export let placeInformation: {
    place_id: string;
    description: string;
    users_in_place: definitions['users_to_places'][];
  };
</script>

<svelte:head>
  <title>{placeInformation.description}</title>
  <meta
    name="description"
    content={`Users currently in ${placeInformation.description}`}
  />
</svelte:head>

<div class="hero min-h-screen-nav bg-base-200">
  <div class="hero-content flex-col">
    <div class="text-center">
      <h1 class="text-5xl font-bold">{placeInformation.description}</h1>
      <p class="py-6">
        Users currently in {placeInformation.description}
      </p>
      <div class="form-control">
        <a href="/" class="btn btn-primary">Go Back To Map</a>
      </div>
    </div>

    {#each placeInformation.users_in_place as user_in_place}
      <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
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
            <a href={user_in_place.id} class="btn btn-primary">Go to Profile</a>
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>
<div class="hero min-h-screen-nav bg-base-200">
  <div class="hero-content flex-row" />
</div>
