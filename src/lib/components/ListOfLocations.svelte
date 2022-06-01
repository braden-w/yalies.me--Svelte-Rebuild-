<script lang="ts">
  import LocationsListIcon from './icons/LocationsListIcon.svelte';

  import type { definitionsJSON, Person } from '$lib/types/definitionsJSON';
  import { generateStackOfIcons } from '$lib/utils/map/generateInnerHTML';

  import { supabase } from '$lib/utils/supabaseClient';

  let promise = supabase
    .from<definitionsJSON['places_with_people']>('places_with_people')
    .select('*')
    .not('people', 'is', null);

  function getThreeAvatarUrls(place: definitionsJSON['places_with_people']) {
    return place.people
      ?.slice(0, 3)
      .map((person) => (<Person>person).avatar_url);
  }
</script>

<div
  class="rounded-box max-h-96 overflow-y-auto bg-neutral text-base-content shadow-xl"
>
  <ul class="menu overflow-visible p-3">
    <li class="menu-title">
      <span>Locations</span>
    </li>
    {#await promise}
      Loading...
    {:then { data: places }}
      {#if places}
        {#each places as place}
          <li>
            <a href={`/places/${place.place_id}`}>
              {@html generateStackOfIcons({
                threeAvatars: getThreeAvatarUrls(place) ?? [],
                indicator: (place.people ?? []).length
              })}

              {place.description}
            </a>
          </li>
        {/each}
      {/if}
    {:catch name}
      {name}
    {/await}
  </ul>
</div>

<div class="form-control">
  <!-- <div class="divider" /> -->
  <a class="btn btn-secondary btn-block space-x-2" href="/locations">
    <!-- Insert an svg of a list of Locations -->
    <LocationsListIcon />

    <span>Go to Locations</span>
  </a>
</div>
