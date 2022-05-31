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

<div
  class="col-span-3 row-span-2 mx-2 grid w-72 flex-shrink-0 gap-4 xl:mx-0 xl:w-full xl:place-self-stretch"
/>
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
<table class="table w-full">
  <!-- head -->
  <thead>
    <tr>
      <th />
      <th>Name</th>
      <th> People </th>
    </tr>
  </thead>
  <tbody>
    <!-- row 1 -->
    {#await promise}
      Loading...
    {:then { data: places }}
      {#if places}
        {#each places as place, index}
          <tr class="hover" id={place.place_id}>
            <th>
              {index + 1}
            </th>
            <td> {place.description} </td>
            <td> {getPeopleNames(place)} </td>
            <th>
              <a
                href={`/places/${place.place_id}`}
                class="btn btn-primary btn-md"
              >
                Go to Place
              </a>
            </th>
          </tr>
        {/each}
      {/if}
    {:catch name}
      {name}
    {/await}
  </tbody>
  <!-- foot -->
  <tfoot />
</table>
