<script lang="ts">
  import type { definitionsJSON, Person } from '$lib/types/definitionsJSON';

  import { supabase } from '$lib/utils/supabaseClient';

  let promise = supabase
    .from<definitionsJSON['places_with_people']>('places_with_people')
    .select('*')
    .not('people', 'is', null);
  let people: definitionsJSON['places_with_people']['people'];
  promise.then(({ data: places }) => {
    if (!places) return;
    people = places.map((place) => {
      return place.people?.map((person) => (<Person>person).name);
    });
  });
</script>

{#await promise}
  Loading...
{:then { data: places }}
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
      {#if places}
        <!-- row 1 -->
        {#each places as place, index}
          <tr class="hover" id={place.place_id}>
            <th>
              {index + 1}
            </th>
            <td> {place.description} </td>
            <td> {people} </td>
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
    </tbody>
    <!-- foot -->
    <tfoot />
  </table>
{:catch name}
  {name}
{/await}
