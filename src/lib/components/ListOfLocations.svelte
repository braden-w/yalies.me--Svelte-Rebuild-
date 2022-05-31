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
  class="rounded-box mx-2 flex flex-shrink-0 flex-col justify-center gap-4 bg-base-100 p-4 shadow-xl xl:mx-0 xl:w-full"
>
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
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M4 6h16M4 10h16M4 14h16M4 18h16"
        />
      </svg>

      <span>Go to Locations</span>
    </a>
  </div>
</div>
