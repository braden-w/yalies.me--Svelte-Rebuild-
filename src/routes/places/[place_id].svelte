<script context="module" lang="ts">
  import { supabase } from '$lib/utils/supabaseClient';
  export async function load({ params }: { params: { place_id: string } }) {
    const { data, error } = await supabase
      .from('users')
      .select('name, avatar_url, user_responses(places(place_id, description))')
      .eq('user_responses(places(place_id))', params.place_id);
    if (error) return { status: error.code, props: { error } };
    return {
      status: 200,
      props: { userProfileInformation: { place_id: params.place_id, ...data } }
    };
  }
</script>

<script lang="ts">
  import { sessionStore } from '$lib/utils/sessionStore';
  import LocationAutoComplete from '$lib/LocationAutoComplete.svelte';
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
        <LocationAutoComplete />

        <div class="form-control mt-6">
          <a href="/" class="btn btn-primary">Go To Map</a>
        </div>
      </div>
    </div>
  </div>
</div>
