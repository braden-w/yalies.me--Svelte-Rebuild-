<script lang="ts">
  import UserSocials from '$lib/components/UserSocials.svelte';

  import UserResponsesCard from '$lib/components/UserResponsesCard.svelte';
  import UserLocationCard from '$lib/components/UserLocationCard.svelte';
  import UserCard from '$lib/components/UserCard.svelte';
  import SpotifyPlayer from '$lib/components/SpotifyPlayer.svelte';
  import {
    refreshProfileStore,
    profileStore
  } from '$lib/stores/auth/profileStore';
  import TableOfLocations from '$lib/components/TableOfLocations.svelte';
</script>

<svelte:head>
  <title>Profile</title>
  <meta name="description" content="Edit my profile." />
</svelte:head>

<div class="min-h-screen-nav hero bg-base-200">
  <div class="h-full w-full">
    <div
      id="component-demo"
      class="flex w-full flex-col items-stretch gap-4 overflow-x-auto px-4 pt-1 pb-10 xl:grid xl:grid-flow-col xl:grid-cols-5 xl:grid-rows-6"
    >
      <!-- Cell 1 -->
      <div class="col-span-1 row-span-3">
        <UserCard bind:userProfileInformation={$profileStore} />
        <div class="rounded-box mt-4 w-72 bg-neutral py-2 shadow-xl xl:w-full">
          <UserSocials bind:userProfileInformation={$profileStore} />
        </div>
      </div>
      <!-- Cell 2 -->
      <div class="col-span-1 row-span-3">
        <SpotifyPlayer url={$profileStore?.expression} />
        <!-- <UserAvatarsRow {userProfileInformation} /> -->
      </div>
      <!-- Cell 3 -->
      <div class="col-span-1 row-span-3">
        <UserLocationCard bind:userProfileInformation={$profileStore} />
      </div>
      <!-- Cell 4 -->
      <div class="col-span-1 row-span-3">
        <TableOfLocations />
      </div>
      <!-- Cell 5 -->
      <div class="col-span-3 row-span-6">
        <UserResponsesCard bind:userProfileInformation={$profileStore} />
      </div>
      <!-- <div class="col-span-2 row-span-3"> -->
      <!-- <UserStatsInfoOptions {userProfileInformation} /> -->
      <!-- </div> -->
      <!-- Cell 6 -->
      <!-- <div class="col-span-2 row-span-3"> -->
      <!-- </div> -->

      <!-- 
      
      <UserMenuItems {userProfileInformation} />
       -->
    </div>
  </div>
</div>
<!-- <div class="divider divider-horizontal">OR</div> -->
