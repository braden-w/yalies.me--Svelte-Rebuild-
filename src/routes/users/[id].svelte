<script context="module" lang="ts">
  import type { definitionsJSON } from '$lib/types/definitionsJSON';
  import { supabase } from '$lib/utils/supabaseClient';

  export async function load({ params }: { params: { id: string } }) {
    const { data, error } = await supabase
      .from<definitionsJSON['users_facebook_places']>('users_facebook_places')
      .select('*')
      .eq('id', params.id)
      .maybeSingle();
    if (error) return { status: error.code, props: { error } };
    return {
      status: 200,
      props: { userProfileInformation: { id: params.id, ...data } }
    };
  }
</script>

<script lang="ts">
  import UserSocials from '../../lib/components/UserSocials.svelte';

  import UserResponsesCard from '../../lib/components/UserResponsesCard.svelte';
  import UserLocationCard from '../../lib/components/UserLocationCard.svelte';
  import UserCard from '../../lib/components/UserCard.svelte';
  import SpotifyPlayer from '$lib/components/SpotifyPlayer.svelte';

  export let userProfileInformation: definitionsJSON['users_facebook_places'];
</script>

<svelte:head>
  <title>{userProfileInformation.name}</title>
  <meta name="description" content="Profile information." />
</svelte:head>

<div class="min-h-screen-nav hero bg-base-200">
  <div class="h-full w-full">
    <div
      id="component-demo"
      class="flex w-full flex-col items-stretch gap-4 overflow-x-auto px-4 pt-1 pb-10 xl:grid xl:grid-flow-col xl:grid-cols-5 xl:grid-rows-6"
    >
      <!-- Cell 1 -->
      <div class="col-span-1 row-span-2">
        <UserCard {userProfileInformation} />
      </div>
      <div class="col-span-1 row-span-1">
        <div
          class="rounded-box place-items-center items-center gap-4 bg-base-100 p-4 py-8 shadow-xl xl:mx-0 xl:w-full"
        >
          <UserSocials {userProfileInformation} />
        </div>
      </div>
      <!-- Cell 2 -->
      <div class="col-span-1 row-span-3">
        <UserLocationCard {userProfileInformation} />
        <!-- <UserAvatarsRow {userProfileInformation} /> -->
      </div>
      <!-- Cell 3 -->
      <div class="col-span-1 row-span-6">
        <SpotifyPlayer url={userProfileInformation.expression} />
      </div>
      <!-- Cell 4 -->
      <div class="col-span-3 row-span-6">
        <UserResponsesCard {userProfileInformation} />
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
  </div>
</div>
<!-- <div class="divider divider-horizontal">OR</div> -->
