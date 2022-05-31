<script lang="ts">
  import LocationAutoComplete from '$lib/components/LocationAutoComplete.svelte';
  import { profileStore } from '$lib/stores/auth/profileStore';
  import type { definitions } from '$lib/types/supabase';
  import { get } from 'svelte/store';

  export let userProfileInformation:
    | definitions['users_facebook_places']
    | null;
  const isCurrentUser = userProfileInformation?.id === get(profileStore)?.id;
</script>

<div
  class="rounded-box row-span-3 mx-2 flex w-72 flex-shrink-0 flex-col justify-center gap-4 bg-base-100 p-4 shadow-xl xl:mx-0 xl:w-full"
>
  <div class="px-6 pt-6">
    <div class="text-xl font-extrabold">Where are you now?</div>
    <div class="my-4 text-xs text-base-content/70">
      Enter your current city. For privacy, feel free to use a city that is in
      proximity rather than exact location.
    </div>
    <LocationAutoComplete
      {isCurrentUser}
      query={userProfileInformation?.description ?? ''}
    />
  </div>
  <div class="form-control">
    <div class="divider" />
    <a class="btn btn-secondary btn-block space-x-2" href="/map">
      <!-- Insert an svg of a map -->
      <svg
        class="h-6 w-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"
        />
        <circle cx="12" cy="10" r="3" />
      </svg>
      <span>Go to Map</span>
    </a>
  </div>
</div>
