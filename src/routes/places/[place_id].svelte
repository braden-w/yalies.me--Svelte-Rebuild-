<script context="module" lang="ts">
  import { supabase } from '$lib/utils/supabaseClient';
  export async function load({ params }: { params: { place_id: string } }) {
    const { data, error } = await supabase
      .from('users_to_places')
      .select('name, avatar_url, place_id, description')
      .eq('place_id', params.place_id);
    const users_in_place = data as {
      name: string;
      avatar_url: string;
      place_id: string;
      description: string;
    }[];
    if (error) return { status: error.code, props: { error } };
    return {
      status: 200,
      props: { placeInformation: { place_id: params.place_id, users_in_place } }
    };
  }
</script>

<script lang="ts">
  import { sessionStore } from '$lib/utils/sessionStore';
  export let placeInformation: {
    place_id: string;
    users_in_place: {
      name: string;
      avatar_url: string;
      place_id: string;
      description: string;
    }[];
  };
</script>

<svelte:head>
  <title>Profile</title>
  <meta name="description" content="My Profile Information" />
</svelte:head>

<div class="hero min-h-screen-nav bg-base-200">
  <div class="hero-content flex-col lg:flex-row-reverse">
    <div class="text-center lg:text-left">
      <h1 class="text-5xl font-bold">Where are you now?</h1>
      <p class="py-6">
        Enter your current city. For privacy, feel free to use a city that is in
        proximity rather than exact location.
      </p>
    </div>
    {#each placeInformation.users_in_place as user_in_place}
      <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <div class="card-body">
          <div class="text-center">
            <div class="avatar mx-auto">
              <div class="w-28 rounded">
                <img
                  src={$sessionStore?.avatar_url}
                  alt="Profile"
                  width="100%"
                  height="100%"
                  referrerpolicy="no-referrer"
                />
              </div>
            </div>
            <h1 class="text-2xl font-bold">{$sessionStore?.name}</h1>
            <p class="text-lg">Yale University</p>
          </div>

          <div class="form-control mt-6">
            <a href="/" class="btn btn-primary">Go To Map</a>
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>
