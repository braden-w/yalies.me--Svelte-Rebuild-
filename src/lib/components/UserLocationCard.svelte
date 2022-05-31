<script lang="ts">
  import MapIcon from './icons/MapIcon.svelte';

  import LocationAutoComplete from '$lib/components/LocationAutoComplete.svelte';
  import { profileStore } from '$lib/stores/auth/profileStore';
  import type { definitionsJSON } from '$lib/types/definitionsJSON';
  import { get } from 'svelte/store';

  export let userProfileInformation:
    | definitionsJSON['users_facebook_places']
    | null;
  const isCurrentUser = userProfileInformation?.id === get(profileStore)?.id;
</script>

<div
  class="rounded-box  mx-2 flex flex-shrink-0 flex-col justify-center gap-4 bg-base-100 p-4 shadow-xl xl:mx-0 xl:w-full"
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
      <MapIcon />
      <span>Go to Map</span>
    </a>
  </div>
</div>
