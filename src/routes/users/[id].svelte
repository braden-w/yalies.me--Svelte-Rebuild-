<script context="module" lang="ts">
  import { supabase } from '$lib/utils/supabaseClient';
  export async function load({ params }: { params: { id: string } }) {
    const { data, error } = await supabase
      .from('users')
      .select('name, avatar_url, user_responses(places(description))')
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

  import LocationAutoComplete from '$lib/components/LocationAutoComplete.svelte';
  import { sessionStore } from '$lib/stores/sessionStore';

  export let userProfileInformation: {
    id: string;
    name: string;
    avatar_url: string;
    user_responses: {
      places: {
        description: string;
      };
    };
  };
</script>

<svelte:head>
  <title>{userProfileInformation.name}</title>
  <meta name="description" content="Profile information" />
</svelte:head>

<div class="hero min-h-screen-nav bg-base-200">
  <div class="hero-content flex-col lg:flex-row-reverse">
    <UserCard {userProfileInformation}></UserCard>
  </div>
</div>
