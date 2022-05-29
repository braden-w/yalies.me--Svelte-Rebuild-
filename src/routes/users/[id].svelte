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
  import UserCard from './CardOfUser.svelte';

  export let userProfileInformation: UserProfileInformation;
  const userResponses = [
    {
      name: 'interests',
      label: 'Interests',
      icon: 'heart',
      value: userProfileInformation.user_responses.interests
    },
    {
      name: 'expression',
      label: 'Expression',
      icon: 'smile',
      value: userProfileInformation.user_responses.expression
    },
    {
      name: 'university',
      label: 'University',
      icon: 'graduation-cap',
      value: userProfileInformation.user_responses.university
    },
    {
      name: 'instagram',
      label: 'Instagram',
      icon: 'instagram',
      value: userProfileInformation.user_responses.instagram
    },
    {
      name: 'linkedin',
      label: 'Linkedin',
      icon: 'linkedin',
      value: userProfileInformation.user_responses.linkedin
    },
    {
      name: 'phone',
      label: 'Phone',
      icon: 'phone',
      value: userProfileInformation.user_responses.phone
    },
    {
      name: 'major',
      label: 'Major',
      icon: 'book',
      value: userProfileInformation.user_responses.major
    }
  ];
</script>

<svelte:head>
  <title>{userProfileInformation.name}</title>
  <meta name="description" content="Profile information" />
  <script
    src="https://kit.fontawesome.com/f538ad6371.js"
    crossorigin="anonymous"></script>
</svelte:head>

<div class="hero min-h-screen-nav bg-base-200">
  <div class="w-full">
    <!-- A centered large card with two columns and bg-base-100 -->
    <div class="flex w-full">
      <UserCard {userProfileInformation} />
      <div class="divider divider-horizontal">OR</div>
      <div
        class="grid h-100 flex-grow card shadow-2xl bg-base-100 rounded-box place-items-center"
      >
        {#each userResponses as { name, label, icon, value }}
          <div class="form-control">
            <label class="label" for="location">
              <span class="label-text">{label}</span>
              <i class="fas fa-{icon} text-base" />
            </label>
            <input
              tabindex="0"
              type="text"
              id="location"
              class="input input-bordered"
              disabled
              placeholder="Start typing your city here..."
              bind:value
            />
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>
