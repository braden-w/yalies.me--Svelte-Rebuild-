<script lang="ts">
  import type { UserProfileInformation } from 'src/routes/users/[id].svelte';

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
  $: userResponsesNonempty = userResponses.filter(
    (response) => response.value !== null
  );
</script>

<div
  class="grid h-100 flex-grow card shadow-2xl bg-base-100 rounded-box place-items-center"
>
  {#each userResponsesNonempty as { name, label, icon, value }}
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
