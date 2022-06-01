<script lang="ts">
  import UserSocials from '$lib/components/UserSocials.svelte';
  import type { PlaceInformation } from 'src/routes/places/[place_id].svelte';

  export let users: PlaceInformation['users_in_place'];
</script>

<div
  class="rounded-box max-h-96 overflow-y-auto bg-neutral text-neutral-content shadow-xl"
>
  <ul class="menu overflow-visible p-3">
    <li class="menu-title">
      <span>Locations</span>
    </li>
    {#if users}
      {#each users as user}
        <li>
          <a href={`/places/${user.place_id}`}>
            <div class="mask mask-squircle w-8">
              <img
                src={user.avatar_url}
                alt="Profile"
                height="100%"
                width="100%"
                referrerpolicy="no-referrer"
              />
            </div>
            {user.name}
            <UserSocials userProfileInformation={user} />
          </a>
        </li>
      {/each}
    {/if}
  </ul>
</div>
