<script lang="ts">
  import { sessionStore } from '$lib/stores/sessionStore';

  import type { UserProfileInformation } from 'src/routes/users/[id].svelte';

  export let userProfileInformation: UserProfileInformation;
  const isCurrentUser = userProfileInformation?.id === $sessionStore?.id;
  export let userResponses;
</script>

<div
  class="bg-base-100 rounded-box row-span-3 mx-2 flex w-72 flex-shrink-0 flex-col justify-center gap-4 p-4 shadow-xl xl:mx-0 xl:w-full"
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
          disabled={!isCurrentUser}
          placeholder="Start typing your response here..."
          bind:value
        />
      </div>
    {/each}
  </div>
  <div class="form-control">
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
</div>
