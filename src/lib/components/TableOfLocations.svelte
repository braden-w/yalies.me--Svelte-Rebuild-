<script lang="ts">
  import type { definitionsJSON } from '$lib/types/definitionsJSON';

  import { supabase } from '$lib/utils/supabaseClient';

  let promise = supabase
    .from<definitionsJSON['places_with_people']>('places_with_people')
    .select('*')
    .not('people', 'is', null);
  function getPeopleNameAndAvatarURL(
    place: definitionsJSON['places_with_people']
  ) {
    return place.people?.map((person) => ({
      name: (<Person>person).name,
      avatar_url: (<Person>person).avatar_url
    }));
  }
</script>

<table class="table w-full">
  <!-- head -->
  <thead>
    <tr>
      <th />
      <th>Name</th>
      <th> People </th>
      <th />
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
            <td class="overflow-visible">
              <div class="avatar-group overflow-visible -space-x-2">
                {#each place.people as person}
                  <div class="avatar h-8 w-8">
                    <img src={person.avatar_url} alt={person.name} />
                  </div>
                {/each}
                <div class="avatar placeholder">
                  <div class="w-12 bg-neutral-focus text-neutral-content">
                    <span>+99</span>
                  </div>
                </div>
              </div>

              <!-- {getPeopleNames(place)} -->
            </td>
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
