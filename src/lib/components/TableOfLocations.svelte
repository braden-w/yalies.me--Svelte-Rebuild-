<script lang="ts">
  import type { definitions } from '$lib/types/supabase';

  import { supabase } from '$lib/utils/supabaseClient';

  let promise = supabase.from<definitions['places']>('places').select('*');
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
        <th>College</th>
        <th>Socials</th>
        <th />
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
            <td> Hi </td>
            <td>Hi</td>
            <td />
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
