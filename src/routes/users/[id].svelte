<script context="module" lang="ts">
  import type { definitions } from '$lib/types/supabase';
  import { supabase } from '$lib/utils/supabaseClient';

  export type UserProfileInformation = definitions['users'] & {
    user_responses: {
      places: {
        interests: string;
        expression: string;
        university: string;
        instagram: string;
        linkedin: string;
        phone: string;
        major: string;
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
  import UserCard from './CardOfUser.svelte';

  export let userProfileInformation: UserProfileInformation;
</script>

<svelte:head>
  <title>{userProfileInformation.name}</title>
  <meta name="description" content="Profile information" />
</svelte:head>

<div class="hero min-h-screen-nav bg-base-200">
  <div class="hero-content flex-col lg:flex-row-reverse">
    <div class="flex w-full">
      <div
        class="grid h-20 flex-grow card bg-base-300 rounded-box place-items-center"
      >
        content
      </div>
      <div class="divider divider-horizontal">OR</div>
      <div
        class="grid h-20 flex-grow card bg-base-300 rounded-box place-items-center"
      >
        content
      </div>
    </div>
    <UserCard {userProfileInformation} />
    <!-- Create a card that displays -->
    <!-- the user's information -->
    <div class="flex-1">
      <div class="flex flex-col">
        <div class="flex-1">
          <h2 class="text-2xl font-bold">
            {userProfileInformation.name}
          </h2>
        </div>
        <div class="flex-1">
          <p class="text-base">
            {userProfileInformation.user_responses.interests}
          </p>
          <p class="text-base">
            {userProfileInformation.user_responses.expression}
          </p>
          <p class="text-base">
            {userProfileInformation.user_responses.university}
          </p>
          <p class="text-base">
            {userProfileInformation.user_responses.instagram}
          </p>
          <p class="text-base">
            {userProfileInformation.user_responses.linkedin}
          </p>
          <p class="text-base">
            {userProfileInformation.user_responses.phone}
          </p>
          <p class="text-base">
            {userProfileInformation.user_responses.major}
          </p>
        </div>
      </div>
    </div>
  </div>
</div>
