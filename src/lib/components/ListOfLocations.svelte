<script lang="ts">
  import type { definitionsJSON, Person } from '$lib/types/definitionsJSON';
  import { generateStackOfIcons } from '$lib/utils/map/generateInnerHTML';

  import { supabase } from '$lib/utils/supabaseClient';

  let promise = supabase
    .from<definitionsJSON['places_with_people']>('places_with_people')
    .select('*')
    .not('people', 'is', null);
  function getPeopleNames(place: definitionsJSON['places_with_people']) {
    return place.people?.map((person) => (<Person>person).name);
  }

  function getThreeAvatarUrls(place: definitionsJSON['places_with_people']) {
    return place.people
      ?.slice(0, 3)
      .map((person) => (<Person>person).avatar_url);
  }
</script>

<div class="rounded-box bg-base-100 text-base-content shadow-xl">
  <ul class="menu overflow-visible p-3">
    <li class="menu-title">
      <span>Places</span>
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

