<script lang="ts">
  import type { definitions } from '$lib/types/supabase';

  export let userProfileInformation:
    | definitions['users_facebook_places']
    | null;
</script>

<div
  class="rounded-box grid w-72 place-items-center items-center gap-4 bg-base-100 p-4 py-8 shadow-xl xl:mx-0 xl:w-full"
>
  <div class="avatar online">
    <div
      class="mask mask-squircle h-24 w-24 bg-base-content bg-opacity-10 p-px"
    >
      <img
        src={userProfileInformation?.avatar_url}
        alt="Avatar Tailwind CSS Component"
        class="mask mask-squircle"
        referrerpolicy="no-referrer"
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
        {userProfileInformation?.major}
        <br />
        Yale University
        <br />
        {userProfileInformation?.school}
        <br />
        Student
      </div>
    </div>

    <div class="mt-2 text-center">
      <div class="badge badge-ghost">Design</div>
      <div class="badge badge-ghost">Art</div>
      <div class="badge badge-ghost">Illustration</div>
    </div>
  </div>
  <div class="dropdown-top dropdown">
    <div tabindex="0">
      <div class="btn-group">
        <button class="btn btn-accent btn-sm">Follow</button>
        <button
          aria-label="button component"
          class="btn btn-square btn-accent btn-sm"
        >
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
              d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
            />
          </svg>
        </button>
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
