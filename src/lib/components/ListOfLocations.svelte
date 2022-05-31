<script lang="ts">
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
  class="rounded-box max-h-96 overflow-y-auto bg-base-100 text-base-content shadow-xl"
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
