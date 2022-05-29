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
      label: 'Spotify',
      icon: 'spotify',
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

<div class="shadow-2xl card place-items-center rounded-2xl bg-base-100">
  <div class="card-body">
    {#each userResponses as { name, label, icon, value }}
      <div class="form-control">
        <label class="label" for={name}>
          <span class="label-text">{label}</span>
          <button class="btn btn-primary btn-circle btn-xs">
            <i class="fa fa-{icon}" /></button
          >
        </label>
        <input
          tabindex="0"
          type="text"
          id={name}
          class="input input-bordered"
          disabled
          placeholder="Start typing your response here..."
          bind:value
        />
      </div>
    {/each}
  </div>
</div>
