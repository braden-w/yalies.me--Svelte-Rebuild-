<script lang="ts">
  import type { UserProfileInformation } from 'src/routes/users/[id].svelte';

  export let userProfileInformation: UserProfileInformation;
  const userResponses = userProfileInformation.user_responses;
</script>

<div
  class="rounded-box grid w-72 place-items-center items-center gap-4 bg-base-100 p-4 py-8 shadow-xl xl:mx-0 xl:w-full"
>
  <div class="online avatar">
    <div
      class="mask mask-squircle h-24 w-24 bg-base-content bg-opacity-10 p-px"
    >
      <img
        src={userProfileInformation.avatar_url}
        alt="Avatar Tailwind CSS Component"
        class="mask mask-squircle"
        width="94"
        height="94"
      />
    </div>
  </div>

  <div>
    <div class="text-center">
      <div class="text-lg font-extrabold">
        {userProfileInformation?.name}
      </div>
      <div class="my-3 text-sm text-base-content/70">
        Ethics, Politics, & Economics
        <br />
        Yale University
        <br />
        Student
      </div>
    </div>

    <div class="mt-2 text-center">
      <div class="badge badge-ghost">Design</div>
      <div class="badge badge-ghost">Art</div>
      <div class="badge badge-ghost">Illustration</div>
    </div>
    <div class="mt-2 text-center">
      {#if userProfileInformation.email}
        <a
          class="badge badge-primary"
          href={`mailto:${userProfileInformation.email}`}
        >
          <!-- Make an svg email icon -->
          <svg
            class="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg></a
        >
      {/if}
      {#if userResponses.phone}
        <a class="badge badge-primary" href={`sms:${userResponses.phone}`}>
          <!-- Make a svg phone icon -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
        </a>
      {/if}

      {#if userResponses.expression}
        <a
          class="badge badge-accent"
          target="_blank"
          href={userResponses.expression}
        >
          <!-- Make a Green Spotify Icon -->
        </a>
      {/if}
      {#if userResponses.instagram}
        <a
          class="badge badge-primary"
          target="_blank"
          href={`https://www.instagram.com/${userResponses.instagram}/`}
        >
          Instagram
        </a>
      {/if}
      {#if userResponses.linkedin}
        <a
          class="badge badge-primary"
          target="_blank"
          href={userResponses.linkedin}
        >
          LinkedIn
        </a>
      {/if}
    </div>
  </div>
  <div class="dropdown-top dropdown">
    <div tabindex="0">
      <div class="btn-group">
        <button class="btn btn-accent btn-sm">Follow</button>
        <button
          aria-label="button component"
          class="btn btn-accent btn-square btn-sm"
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="h-6 w-6 stroke-current"
            ><path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
            /></svg
          ></button
        >
      </div>
    </div>
    <div tabindex="0" class="dropdown-content py-2">
      <div
        class="card compact rounded-box w-72 bg-neutral-focus text-neutral-content shadow-xl"
      >
        <div class="card-body">
          <h2 class="card-title font-extrabold capitalize">
            button group component
          </h2>
          <p class="text-sm text-neutral-content text-opacity-80">
            Use it to group multiple buttons together
          </p>
          <div class="mt-4 flex justify-end">
            <a
              href="/components/button-group"
              class="btn btn-primary btn-sm xl:btn-md">See component</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
