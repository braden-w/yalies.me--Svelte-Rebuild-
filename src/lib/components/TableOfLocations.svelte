<script lang="ts">
  import type { definitions } from '$lib/types/supabase';

  import { supabase } from '$lib/utils/supabaseClient';

  let promise = supabase.from<definitions['places'][]>('places').select('*');
</script>

{#await promise}
  Loading...
{:then places}
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
      <!-- row 1 -->
      {#each places as place, index}
        <tr class="hover" id={place.id}>
          <th>
            {index + 1}
          </th>
          <td>
            <div class="flex items-center space-x-3">
              <div class="avatar">
                <div class="mask mask-squircle h-12 w-12">
                  <img
                    src={place.avatar_url}
                    alt="User Profile"
                    referrerpolicy="no-referrer"
                  />
                </div>
              </div>
              <div>
                <div class="font-bold">{place.name}</div>
                <div class="text-sm opacity-50">{place.id}</div>
              </div>
            </div>
          </td>
          <td>
            {#if place?.school || place?.college}
              {[place?.school, place?.college].join(', ')}
              <br />
            {/if}
            <span class="badge badge-sm badge-ghost">{place?.major}</span>
          </td>
          <td />
          <th>
            <a href={`/users/${place.id}`} class="btn btn-primary btn-md">
              Go to Profile
            </a>
          </th>
        </tr>
      {/each}
    </tbody>
    <!-- foot -->
    <tfoot />
  </table>
{:catch name}
  {name}
{/await}
