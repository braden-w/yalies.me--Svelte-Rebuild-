<script context="module" lang="ts">
  import { supabase } from '$lib/utils/supabaseClient';
  export async function load({ params }: { params: { id: string } }) {
    const { data, error } = await supabase
      .from('users')
      .select('name, avatar_url, user_responses(places(description))')
      .eq('id', params.id)
      .maybeSingle();

    if (error) return { status: error.code, props: { error } };
    return {
      status: 200,
      props: { userProfileInformation: { id: params.id, ...data } }
    };
  }
</script>

<script lang="ts">
  import LocationAutoComplete from '$lib/components/LocationAutoComplete.svelte';
  import { sessionStore } from '$lib/stores/sessionStore';

  export let userProfileInformation: {
    id: string;
    name: string;
    avatar_url: string;
    user_responses: {
      places: {
        description: string;
      };
    };
  };
</script>

<svelte:head>
  <title>{userProfileInformation.name}</title>
  <meta name="description" content="Profile information" />
</svelte:head>

<div class="hero min-h-screen-nav bg-base-200">
  <div class="hero-content flex-col lg:flex-row-reverse">
    <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <div class="card-body">
        <div class="text-center">
          <div class="avatar mx-auto">
            <div class="w-28 rounded">
              <img
                src={userProfileInformation?.avatar_url}
                alt="Profile"
                width="100%"
                height="100%"
                referrerpolicy="no-referrer"
              />
            </div>
          </div>
          <h1 class="text-2xl font-bold">{userProfileInformation?.name}</h1>
          <p class="text-lg">Yale University</p>
        </div>

        {#if userProfileInformation?.id === $sessionStore?.id}
          <LocationAutoComplete />
        {:else}
          <div class="form-control">
            <label class="label" for="location">
              <span class="label-text">I'm currently in...</span>
            </label>
            <input
              tabindex="0"
              type="text"
              id="location"
              class="input input-bordered"
              disabled
              placeholder="Start typing your city here..."
              bind:value={userProfileInformation.user_responses.places
                .description}
            />
          </div>
        {/if}

        <div class="form-control mt-6">
          <a href="/map" class="btn btn-primary">Go To Map</a>
        </div>
      </div>
    </div>
  </div>
</div>
