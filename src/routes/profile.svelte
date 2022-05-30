<script lang="ts">
  import UserSocials from '$lib/components/UserSocials.svelte';
  //   import UserResponsesCard from '$lib/components/UserResponsesCard.svelte';
  //   import UserLocationCard from '$lib/components/UserLocationCard.svelte';
  //   import UserCard from '$lib/components/UserCard.svelte';
  //   import SpotifyPlayer from '$lib/components/SpotifyPlayer.svelte';
  import { refreshSessionStore, sessionStore } from '$lib/stores/sessionStore';
  refreshSessionStore();
</script>

<svelte:head>
  <title>{$sessionStore?.name}</title>
  <meta name="description" content="Profile information" />
  <script
    src="https://kit.fontawesome.com/f538ad6371.js"
    crossorigin="anonymous">
  </script>
</svelte:head>

<div class="min-h-screen-nav hero bg-base-200">
  <div class="h-full w-full">
    <div
      id="component-demo"
      class="flex w-full flex-col items-stretch gap-4 overflow-x-auto px-4 pt-1 pb-10 xl:grid xl:grid-flow-col xl:grid-cols-5 xl:grid-rows-6"
    >
      <!-- Cell 1 -->
      <div class="col-span-1 row-span-2">
        <!-- <UserCard {...$sessionStore} /> -->
      </div>
      <div class="col-span-1 row-span-1">
        <UserSocials {...$sessionStore} />
      </div>
      <!-- Cell 2 -->
      <div class="col-span-1 row-span-3">
        <!-- <UserLocationCard {...$sessionStore} /> -->
        <!-- <UserAvatarsRow {$sessionStore} /> -->
      </div>
      <!-- Cell 3 -->
      <div class="col-span-1 row-span-6">
        <!-- <SpotifyPlayer url={$sessionStore?.expression} /> -->
      </div>
      <!-- Cell 4 -->
      <div class="col-span-3 row-span-6">
        <!-- <UserResponsesCard {...$sessionStore} /> -->
      </div>
      <!-- Cell 5 -->
      <!-- <div class="col-span-2 row-span-3"> -->
      <!-- <UserStatsInfoOptions {$sessionStore} /> -->
      <!-- </div> -->
      <!-- Cell 6 -->
      <!-- <div class="col-span-2 row-span-3"> -->
      <!-- </div> -->

      <!-- 
      
      <UserMenuItems {$sessionStore} />
       -->
    </div>
  </div>
</div>
<!-- <div class="divider divider-horizontal">OR</div> -->
