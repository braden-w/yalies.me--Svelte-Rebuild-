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
          <div class="flex flex-row justify-between">
            <div class="flex items-center space-x-3">
              <div class="avatar">
                <div class="mask mask-squircle w-8">
                  <img
                    src={user.avatar_url}
                    alt="Profile"
                    height="100%"
                    width="100%"
                    referrerpolicy="no-referrer"
                  />
                </div>
              </div>
              <div>
                <div class="font-bold">{user.name}</div>
                <div class="text-sm opacity-50">{user.college}</div>
              </div>
            </div>
            <a href={`/places/${user.place_id}`}>
              <UserSocials userProfileInformation={user} />
            </a>
          </div>
        </li>
      {/each}
    {/if}
  </ul>
</div>
