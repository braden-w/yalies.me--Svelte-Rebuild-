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
</script>

<div
  class="bg-base-100 rounded-box col-span-3 row-span-3 mx-2 flex w-72 flex-shrink-0 flex-col justify-center gap-4 p-4 shadow-xl xl:mx-0 xl:w-full"
>
  <div class="px-6 pt-6">
    <div class="text-xl font-extrabold">Responses</div>
    <div class="text-base-content/70 my-4 text-xs">
      A manner of expressing yourself
    </div>

    {#each userResponses as { name, label, icon, value }}
      <div class="form-control">
        <label class="label" for={name}>
          <span class="label-text">{label}</span>
          <button class="btn btn-xs btn-primary btn-circle">
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

    <div class="form-control">
      <label class="label cursor-pointer"
        ><span class="label-text">Enable laser eyes</span>
        <input type="checkbox" class="toggle toggle-accent" /></label
      >
    </div>
    <div class="form-control">
      <label class="label cursor-pointer"
        ><span class="label-text">Enable immortality</span>
        <input type="checkbox" class="toggle" /></label
      >
    </div>
  </div>
  <div class="form-control">
    <div class="dropdown dropdown-top dropdown-end">
      <div tabindex="0">
        <button class="btn btn-secondary btn-block space-x-2"
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="h-6 w-6 stroke-current"
            ><path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            /></svg
          > <span>Apply settings</span></button
        >
      </div>
      <div tabindex="0" class="dropdown-content py-2">
        <div
          class="card compact bg-neutral-focus text-neutral-content rounded-box w-72 shadow-xl"
        >
          <div class="card-body">
            <h2 class="card-title font-extrabold capitalize">
              button component
            </h2>
            <p class="text-neutral-content text-sm text-opacity-80">
              Buttons come in various shapes, colors and sizes
            </p>
            <div class="mt-4 flex justify-end">
              <a
                href="/components/button"
                class="btn btn-primary btn-sm xl:btn-md">See component</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
