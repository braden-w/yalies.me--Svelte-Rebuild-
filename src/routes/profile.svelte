<script lang="ts">
  import UserSocials from '$lib/components/UserSocials.svelte';

  import UserResponsesCard from '$lib/components/UserResponsesCard.svelte';
  import UserLocationCard from '$lib/components/UserLocationCard.svelte';
  import UserCard from '$lib/components/UserCard.svelte';
  import SpotifyPlayer from '$lib/components/SpotifyPlayer.svelte';
  import type { definitions } from '$lib/types/supabase';
  import {
    refreshProfileStore,
    profileStore
  } from '$lib/stores/auth/profileStore';
  import { get } from 'svelte/store';

  export let userProfileInformation: Promise<
    definitions['users_facebook_places'] | null
  >;
  userProfileInformation = refreshProfileStore(get(profileStore)?.id);
</script>

<svelte:head>
  <title>Profile</title>
  <meta name="description" content="Edit my profile." />
</svelte:head>

<div class="min-h-screen-nav hero bg-base-200">
  <div class="h-full w-full">
    {#await userProfileInformation then userProfileInformation}
      <div
        id="component-demo"
        class="flex w-full flex-col items-stretch gap-4 overflow-x-auto px-4 pt-1 pb-10 xl:grid xl:grid-flow-col xl:grid-cols-5 xl:grid-rows-6"
      >
        <!-- Cell 1 -->
        <div class="col-span-1 row-span-2">
          <UserCard
            name={userProfileInformation?.name}
            avatar_url={userProfileInformation?.avatar_url}
          />
        </div>
        <div class="col-span-1 row-span-1">
          <UserSocials
            email={userProfileInformation?.email}
            phone={userProfileInformation?.phone}
            expression={userProfileInformation?.expression}
            instagram={userProfileInformation?.instagram}
            linkedin={userProfileInformation?.linkedin}
          />
        </div>
        <!-- Cell 2 -->
        <div class="col-span-1 row-span-3">
          <UserLocationCard
            id={userProfileInformation?.id}
            description={userProfileInformation?.description}
          />
          <!-- <UserAvatarsRow {userProfileInformation} /> -->
        </div>
        <!-- Cell 3 -->
        <div class="col-span-1 row-span-6">
          <SpotifyPlayer url={userProfileInformation?.expression} />
        </div>
        <!-- Cell 4 -->
        <div class="col-span-3 row-span-6">
          <UserResponsesCard
            id={userProfileInformation?.id}
            interests={userProfileInformation?.interests}
            major={userProfileInformation?.major}
            phone={userProfileInformation?.phone}
            expression={userProfileInformation?.expression}
            instagram={userProfileInformation?.instagram}
            linkedin={userProfileInformation?.linkedin}
          />
        </div>
        <!-- Cell 5 -->
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
    {/await}
  </div>
</div>
<!-- <div class="divider divider-horizontal">OR</div> -->
