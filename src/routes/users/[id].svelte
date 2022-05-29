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
    <UserCard {userProfileInformation} />
    <!-- Create a card that displays -->
  </div>
</div>
