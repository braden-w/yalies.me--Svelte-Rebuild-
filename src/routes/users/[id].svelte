<script context="module" lang="ts">
  import type { definitions } from '$lib/types/supabase';
  import { supabase } from '$lib/utils/supabaseClient';

  export type UserProfileInformation = definitions['users'] & {
    user_responses: {
      interests: string;
      expression: string;
      university: string;
      instagram: string;
      linkedin: string;
      phone: string;
      major: string;
      places: {
        description: string;
      };
    };
  };
  export async function load({ params }: { params: { id: string } }) {
    const { data, error } = await supabase
      .from<definitions['users']>('users')
      .select(
        'name, avatar_url, user_responses(interests, expression, university, instagram, linkedin, phone, major, places(description))'
      )
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
  import UserResponsesCard from './UserResponsesCard.svelte';
  import UserMenuItems from '../../lib/components/UserMenuItems.svelte';
  import UserLocationCard from '../../lib/components/UserLocationCard.svelte';
  import UserStatsInfoOptions from '../../lib/components/UserStatsInfoOptions.svelte';
  import UserCard from '../../components/UserCard.svelte';
  import SpotifyPlayer from '$lib/components/SpotifyPlayer.svelte';

  export let userProfileInformation: UserProfileInformation;
</script>

<svelte:head>
  <title>{userProfileInformation.name}</title>
  <meta name="description" content="Profile information" />
  <script
    src="https://kit.fontawesome.com/f538ad6371.js"
    crossorigin="anonymous"></script>
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
      <!-- Cell 2 -->
      <div class="col-span-1 row-span-1">
        <div
          class="mx-2 flex w-72 flex-shrink-0 flex-col justify-center xl:mx-0 xl:w-full"
        >
          <div class="flex items-center justify-between">
            <div class="online avatar">
              <div class="mask mask-squircle h-16 w-16 bg-base-100 p-1">
                <img
                  src={userProfileInformation.avatar_url}
                  alt="Avatar Tailwind CSS Component"
                  class="mask mask-squircle"
                />
              </div>
            </div>
            <div class="online avatar">
              <div class="mask mask-squircle h-16 w-16 bg-base-100 p-1">
                <img
                  src={userProfileInformation.avatar_url}
                  alt="Avatar Tailwind CSS Component"
                  class="mask mask-squircle"
                />
              </div>
            </div>
            <div class="avatar offline">
              <div class="mask mask-squircle h-16 w-16 bg-base-100 p-1">
                <img
                  src={userProfileInformation.avatar_url}
                  alt="Avatar Tailwind CSS Component"
                  class="mask mask-squircle"
                />
              </div>
            </div>
            <div class="avatar">
              <div class="mask mask-squircle h-16 w-16 bg-base-100 p-1">
                <img
                  src={userProfileInformation.avatar_url}
                  alt="Avatar Tailwind CSS Component"
                  class="mask mask-squircle"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Cell 3 -->
      <div class="col-span-1 row-span-3">
        <UserLocationCard {userProfileInformation} />
      </div>
      <!-- Cell 4 -->
      <div class="col-span-2 row-span-6">
        <UserResponsesCard {userProfileInformation} />
      </div>
      <!-- Cell 5 -->
      <div class="col-span-2 row-span-3">
        <UserStatsInfoOptions {userProfileInformation} />
      </div>
      <!-- Cell 6 -->
      <div class="col-span-2 row-span-3">
        <SpotifyPlayer url={userProfileInformation.user_responses.expression} />
      </div>

      <!-- 
      
      <UserMenuItems {userProfileInformation} />
      
      
      

      
      

      
      
       -->
    </div>
  </div>
</div>
<!-- <div class="divider divider-horizontal">OR</div> -->
