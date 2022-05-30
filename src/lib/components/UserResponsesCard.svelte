<script lang="ts">
  import { sessionStore } from '$lib/stores/sessionStore';
  import type { definitions } from '$lib/types/supabase';

  export let id: definitions['users_facebook_places']['id'] = '';
  export let major: definitions['users_facebook_places']['major'] = '';
  export let phone: definitions['users_facebook_places']['phone'] = '';
  export let interests: definitions['users_facebook_places']['interests'] = '';
  export let instagram: definitions['users_facebook_places']['instagram'] = '';
  export let linkedin: definitions['users_facebook_places']['linkedin'] = '';
  export let expression: definitions['users_facebook_places']['expression'] =
    '';
  const isCurrentUser = id === $sessionStore?.id;
  export let inputsList = [
    {
      name: 'university',
      label: 'University',
      icon: 'graduation-cap',
      value: 'Yale University'
    },
    {
      name: 'major',
      label: 'Major',
      icon: 'book',
      value: major
    },
    {
      name: 'phone',
      label: 'Phone',
      icon: 'phone',
      value: phone
    }
  ];
  export let userIntegrations = [
    {
      name: 'interests',
      label: 'Interests',
      icon: 'heart',
      value: interests
    },
    {
      name: 'instagram',
      label: 'Instagram',
      icon: 'instagram',
      value: instagram
    },
    {
      name: 'linkedin',
      label: 'Linkedin',
      icon: 'linkedin',
      value: linkedin
    },
    {
      name: 'expression',
      label: 'Spotify',
      icon: 'spotify',
      value: expression
    }
  ];
</script>

<div
  class="rounded-box row-span-3 mx-2 flex w-72 flex-shrink-0 flex-col justify-center gap-4 bg-base-100 p-4 shadow-xl xl:mx-0 xl:w-full"
>
  <div class="px-6 pt-6">
    <div class="text-xl font-extrabold">Contact Information</div>
    <div class="my-4 text-xs text-base-content/70" />

    {#each inputsList as { name, label, icon, value }}
      <div class="form-control">
        <label class="label" for={name}>
          <span class="label-text">{label}</span>
          <button class="btn btn-circle btn-primary btn-xs">
            <i class="fa fa-{icon}" />
          </button>
        </label>
        <input
          tabindex="0"
          type="text"
          id={name}
          class="input input-bordered"
          disabled={!isCurrentUser}
          placeholder="Start typing your response here..."
          bind:value
        />
      </div>
    {/each}
    <div class="divider" />
    <div class="text-xl font-extrabold">Social Media</div>
    <div class="my-4 text-xs text-base-content/70">Put your Instagram</div>
    {#each userIntegrations as { name, label, icon, value }}
      <div class="form-control">
        <label class="label" for={name}>
          <span class="label-text">{label}</span>
          <button class="btn btn-circle btn-primary btn-xs">
            <i class="fa fa-{icon}" />
          </button>
        </label>
        <input
          tabindex="0"
          type="text"
          id={name}
          class="input input-bordered"
          disabled={!isCurrentUser}
          placeholder="Start typing your response here..."
          bind:value
        />
      </div>
    {/each}
  </div>
  <div class="form-control">
    <div class="divider" />
    <button class="btn btn-secondary btn-block space-x-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        class="h-6 w-6 stroke-current"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span>Apply settings</span>
    </button>
  </div>
</div>
